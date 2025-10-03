using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Command.UpdateBooking
{
    public interface IUpdateBookingService
    {
        Task UpdateAsync(int bookingId, BookingAggregateDto updatedBooking, CancellationToken cancellationToken = default);
    }
}
