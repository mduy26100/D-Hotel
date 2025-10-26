using Application.Common.Interfaces.Services.Email;
using Application.Features.Bookings.Configurations;
using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.PaymentStrategies;
using Application.Features.Bookings.Repositories;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Consts;
using Domain.Enums.Bookings;
using Microsoft.Extensions.Options;
using Stripe.Checkout;
using InvoiceEntity = Domain.Models.Bookings.Invoice;

namespace Application.Features.Bookings.PaymentStrategies
{
    public class StripePaymentStrategy : IPaymentStrategy
    {
        public PaymentProvider Provider => PaymentProvider.Stripe;

        private readonly StripeSettings _stripeSettings;
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public StripePaymentStrategy(
            IOptions<StripeSettings> stripeSettings,
            IBookingRepository bookingRepository,
            IBookingDetailRepository bookingDetailRepository,
            IInvoiceRepository invoiceRepository,
            IRoomTypeRepository roomTypeRepository,
            IApplicationDbContext context,
            IEmailService emailService,
            IMapper mapper)
        {
            _stripeSettings = stripeSettings.Value;
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _roomTypeRepository = roomTypeRepository;
            _context = context;
            _mapper = mapper;
            _emailService = emailService; // 👈 gán
        }

        public async Task<InvoiceDto> HandleBookingAsync(BookingAggregateDto bookingAggregateDto, Guid? userId)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // --- Lấy RoomType ---
                var roomType = await _roomTypeRepository.GetByIdAsync(bookingAggregateDto.Booking.RoomTypeId)
                    ?? throw new InvalidOperationException("RoomType không tồn tại.");

                var totalActiveBookings = await _bookingRepository.CountActiveBookingsAsync(roomType.Id);
                if (roomType.Quantity - totalActiveBookings <= 0)
                    throw new InvalidOperationException("No available rooms.");

                // --- Tạo Booking Pending ---
                var bookingEntity = _mapper.Map<Domain.Models.Bookings.Booking>(bookingAggregateDto.Booking);
                if (userId.HasValue) bookingEntity.UserId = userId;
                bookingEntity.Status = BookingStatus.Pending;
                await _bookingRepository.AddAsync(bookingEntity);
                await _context.SaveChangesAsync();

                // --- Thêm BookingDetails ---
                decimal detailsTotal = 0;
                foreach (var detailDto in bookingAggregateDto.Details)
                {
                    var detailEntity = _mapper.Map<Domain.Models.Bookings.BookingDetail>(detailDto);
                    detailEntity.BookingId = bookingEntity.Id;
                    detailEntity.TotalPrice = (detailEntity.UnitPrice ?? 0) * (detailEntity.Quantity ?? 0);
                    detailsTotal += detailEntity.TotalPrice ?? 0;
                    await _bookingDetailRepository.AddAsync(detailEntity);
                }
                await _context.SaveChangesAsync();

                // --- Tạo Invoice Pending ---
                var invoice = new InvoiceEntity
                {
                    BookingId = bookingEntity.Id,
                    InvoiceNumber = $"INV-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}",
                    TotalAmount = bookingEntity.RentalPrice + detailsTotal,
                    PaymentMethod = Provider.ToString(),
                    IssuedDate = DateTime.UtcNow,
                    Status = "Pending"
                };
                await _invoiceRepository.AddAsync(invoice);
                await _context.SaveChangesAsync();

                // --- Stripe Checkout Session ---
                Stripe.StripeConfiguration.ApiKey = _stripeSettings.SecretKey;

                var lineItems = bookingAggregateDto.Details?.Any() == true
                    ? bookingAggregateDto.Details.Select(d =>
                    {
                        // Build tên hiển thị chi tiết phòng
                        string productName = $"Room Name: {roomType.Name} - Room Type: {bookingAggregateDto.Booking.RentalType}";


                        return new SessionLineItemOptions
                        {
                            PriceData = new SessionLineItemPriceDataOptions
                            {
                                UnitAmount = (long)(d.UnitPrice ?? 0),
                                Currency = "vnd",
                                ProductData = new SessionLineItemPriceDataProductDataOptions
                                {
                                    Name = productName,
                                    Description = $"Guest Name: {bookingAggregateDto.Booking.GuestName}, Phone Number: {bookingAggregateDto.Booking.GuestPhone}"
                                }
                            },
                            Quantity = d.Quantity ?? 1
                        };
                    }).ToList()
                    : new List<SessionLineItemOptions>
                    {
                        new SessionLineItemOptions
                        {
                            PriceData = new SessionLineItemPriceDataOptions
                            {
                                UnitAmount = (long)bookingEntity.RentalPrice,
                                Currency = "vnd",
                                ProductData = new SessionLineItemPriceDataProductDataOptions
                                {
                                    Name = $"Room Name: {roomType.Name} - Room Type: {bookingAggregateDto.Booking.RentalType}",
                                    Description = $"Guest Name: {bookingAggregateDto.Booking.GuestName}, Phone Number: {bookingAggregateDto.Booking.GuestPhone}"
                                }
                            },
                            Quantity = 1
                        }
                    };

                var queryParams = new Dictionary<string, string>
                {
                    ["invoiceNumber"] = invoice.InvoiceNumber,
                    ["roomName"] = roomType.Name,
                    ["rentalType"] = bookingEntity.RentalType ?? "",
                    ["rentalPrice"] = bookingEntity.RentalPrice.ToString(),
                    ["invoiceNumber"] = invoice.InvoiceNumber,
                    ["guestName"] = bookingEntity.GuestName,
                    ["guestPhone"] = bookingEntity.GuestPhone,
                    ["guestEmail"] = bookingEntity.GuestEmail ?? "",
                    ["checkInDate"] = bookingEntity.CheckInDate?.ToString("yyyy-MM-dd") ?? "",
                    ["startTime"] = bookingEntity.StartTime.HasValue ? bookingEntity.StartTime.Value.ToString(@"hh\:mm") : "",
                    ["checkOutDate"] = bookingEntity.CheckOutDate?.ToString("yyyy-MM-dd") ?? "",
                    ["endTime"] = bookingEntity.EndTime.HasValue ? bookingEntity.EndTime.Value.ToString(@"hh\:mm") : "",
                    ["note"] = bookingEntity.Note ?? "",
                    ["paymentMethod"] = invoice.PaymentMethod,
                    ["status"] = invoice.Status
                };

                // Build query string
                var queryString = string.Join("&", queryParams.Select(kvp =>
                    $"{Uri.EscapeDataString(kvp.Key)}={Uri.EscapeDataString(kvp.Value)}"
                ));

                //// Tạo URL frontend
                //invoiceDto.PaymentUrl = $"https://localhost:5173/booking-success?{queryString}";


                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = lineItems,
                    Mode = "payment",
                    SuccessUrl = $"https://localhost:5173/booking-success?{queryString}",
                    CancelUrl = "https://localhost:5173/payment-cancel"
                };

                var service = new SessionService();
                var session = service.Create(options);

                // --- Lưu PaymentIntentId ---
                invoice.PaymentIntentId = session.Id;
                await _context.SaveChangesAsync();

                // --- DTO trả về ---
                var invoiceDto = new InvoiceDto
                {
                    Id = invoice.Id,
                    BookingId = bookingEntity.Id,
                    InvoiceNumber = invoice.InvoiceNumber,
                    TotalAmount = invoice.TotalAmount,
                    PaymentMethod = invoice.PaymentMethod,
                    IssuedDate = invoice.IssuedDate,
                    Status = invoice.Status,
                    PaymentIntentId = invoice.PaymentIntentId,
                    PaymentUrl = session.Url
                };

                // --- Gửi email xác nhận booking ---
                if (!string.IsNullOrEmpty(bookingEntity.GuestEmail))
                {
                    var urlDetail = $"https://localhost:5173/booking-success?{queryString}";
                    var emailSubject = $"[Booking Confirmation] Invoice #{invoice.InvoiceNumber}";
                    var emailBody = $@"
                        <html>
                          <body>
                            <h2>Hello {bookingEntity.GuestName},</h2>
                            <p>Thank you for booking with <strong>D-Hotel</strong>! 
                            Your reservation has been successfully confirmed with invoice number 
                            <strong>{invoice.InvoiceNumber}</strong>.</p>

                            <table border='1' cellspacing='0' cellpadding='6' width='100%'>
                              <tr>
                                <th align='left'>Room</th>
                                <td>{roomType.Name} ({bookingEntity.RentalType})</td>
                              </tr>
                              <tr>
                                <th align='left'>Check-in Date</th>
                                <td>{bookingEntity.CheckInDate:dd/MM/yyyy} {(bookingEntity.StartTime.HasValue ? bookingEntity.StartTime.Value.ToString("hh\\:mm") : "")}</td>
                              </tr>
                              <tr>
                                <th align='left'>Check-out Date</th>
                                <td>{bookingEntity.CheckOutDate:dd/MM/yyyy} {(bookingEntity.EndTime.HasValue ? bookingEntity.EndTime.Value.ToString("hh\\:mm") : "")}</td>
                              </tr>
                              <tr>
                                <th align='left'>Total Amount</th>
                                <td><strong>{invoice.TotalAmount:N0} VND</strong></td>
                              </tr>
                            </table>

                            <p>We’re delighted to have you as our guest and hope you have a comfortable and enjoyable stay.</p>

                            <p>If you have any questions or need assistance, please don’t hesitate to contact us via our hotline or email support.</p>

                            <p>
                              Hotline: <strong>0384 111 516</strong><br>
                              Email: <a href='mailto:manhduy261000@gmail.com'>manhduy261000@gmail.com</a>
                            </p>
                            <br>

                            <a href=""{urlDetail}""
                               style=""background-color:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;"">
                               View booking details
                            </a>

                            <br>
                            <p>Best regards,<br><strong>The D-Hotel Booking Team</strong></p>
                          </body>
                        </html>";

                    await _emailService.SendEmailAsync(bookingEntity.GuestEmail, emailSubject, emailBody);
                }


                await transaction.CommitAsync();
                return invoiceDto;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
