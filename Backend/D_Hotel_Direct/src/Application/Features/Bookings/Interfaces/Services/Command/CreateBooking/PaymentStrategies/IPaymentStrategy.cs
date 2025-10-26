using Application.Features.Bookings.DTOs;
using Domain.Enums.Bookings;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.PaymentStrategies
{
    public interface IPaymentStrategy
    {
        PaymentProvider Provider { get; }
        Task<InvoiceDto> HandleBookingAsync(BookingAggregateDto bookingAggregateDto, Guid? userId);
    }
}
