using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsByBookingId
{
    public interface IGetBookingDetailsByBookingIdService
    {
        Task<IEnumerable<BookingDetailDto>> GetByBookingIdAsync(int bookingId, CancellationToken cancellationToken = default);
    }
}
