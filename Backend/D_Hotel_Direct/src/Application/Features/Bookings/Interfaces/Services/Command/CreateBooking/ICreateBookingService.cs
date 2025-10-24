using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Command.CreateBooking
{
    public interface ICreateBookingService
    {
        Task<BookingDto> CreateAsync(BookingAggregateDto bookingAggregateDto, CancellationToken cancellationToken = default);
    }
}
