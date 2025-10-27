using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingFullInfo;
using Application.Features.Bookings.Repositories;
using Application.Features.Hotels.Repositories;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Enums.Bookings;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingFullInfo
{
    public class GetBookingFullInfoService : IGetBookingFullInfoService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IHotelRepository _hotelRepository;
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetBookingFullInfoService(IBookingRepository bookingRepository
            , IBookingDetailRepository bookingDetailRepository
            , IInvoiceRepository invoiceRepository
            , IHotelRepository hotelRepository
            , IRoomTypeRepository roomTypeRepository
            , IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _hotelRepository = hotelRepository;
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<BookingAggregateDto> GetFullInfoAsync(int bookingId, CancellationToken cancellationToken = default)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId, cancellationToken);

            if (booking == null)
            {
                // Handle not found, e.g., throw exception or return null
                throw new KeyNotFoundException($"Booking with ID {bookingId} not found.");
            }

            var bookingDetails = await _bookingDetailRepository.FindAsync(h => h.BookingId == bookingId, cancellationToken);

            var invoice = await _invoiceRepository.FindOneAsync(h => h.BookingId == bookingId, cancellationToken);

            var roomType = await _roomTypeRepository.GetByIdAsync(booking.RoomTypeId, cancellationToken);

            var hotel = await _hotelRepository.GetByIdAsync(booking.HotelId, cancellationToken);

            var bookingDto = _mapper.Map<BookingDto>(booking);

            bookingDto.RoomTypeName = roomType?.Name ?? "Unknown Room Type";
            bookingDto.HotelName = hotel?.Name ?? "Unknown Hotel";

            // Nếu có invoice, set thêm các thông tin liên quan đến thanh toán
            if (invoice != null)
            {
                bookingDto.InvoiceNumber = invoice.InvoiceNumber;
                bookingDto.PaymentMethod = invoice.PaymentMethod;

                // Convert string -> enum (nếu cần)
                if (Enum.TryParse<PaymentProvider>(invoice.PaymentMethod, true, out var provider))
                {
                    bookingDto.PaymentProvider = provider;
                }
                else
                {
                    bookingDto.PaymentProvider = PaymentProvider.OnSite; // fallback mặc định
                }
            }

            return new BookingAggregateDto
            {
                Booking = bookingDto,
                Details = _mapper.Map<IEnumerable<BookingDetailDto>>(bookingDetails),
            };
        }
    }
}
