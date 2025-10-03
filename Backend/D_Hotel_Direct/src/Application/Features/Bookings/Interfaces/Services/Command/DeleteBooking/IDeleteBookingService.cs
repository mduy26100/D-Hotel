namespace Application.Features.Bookings.Interfaces.Services.Command.DeleteBooking
{
    public interface IDeleteBookingService
    {
        Task DeleteAsync(int bookingId, CancellationToken cancellationToken = default);
    }
}
