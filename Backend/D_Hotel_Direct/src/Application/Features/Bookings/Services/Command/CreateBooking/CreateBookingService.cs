using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.Factory;
using Domain.Consts;
using Stripe;

namespace Application.Features.Bookings.Services.Command.CreateBooking
{
    public class CreateBookingService : ICreateBookingService
    {
        private readonly IPaymentStrategyFactory _strategyFactory;

        public CreateBookingService(IPaymentStrategyFactory strategyFactory)
        {
            _strategyFactory = strategyFactory;
        }

        public async Task<BookingDto> CreateAsync(BookingAggregateDto dto, Guid? userId, CancellationToken cancellationToken)
        {
            var strategy = _strategyFactory.GetStrategy(dto.Booking.PaymentProvider);
            var invoice = await strategy.HandleBookingAsync(dto, userId);

            return new BookingDto
            {
                Id = dto.Booking.Id,
                GuestName = dto.Booking.GuestName,
                GuestPhone = dto.Booking.GuestPhone,
                Status = dto.Booking.Status ?? BookingStatus.Pending,
                InvoiceNumber = invoice.InvoiceNumber,
                PaymentUrl = invoice.PaymentUrl,       // <- chuẩn, FE redirect Stripe
                PaymentMethod = invoice.PaymentMethod  // có thể thêm nếu cần hiển thị
            };
        }
    }
}
