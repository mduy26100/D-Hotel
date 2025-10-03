using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Command.CreateBooking
{
    public interface ICreateBookingService
    {
        Task<int> CreateAsync(BookingAggregateDto bookingAggregateDto, CancellationToken cancellationToken = default);
    }
}
