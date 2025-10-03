using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailById
{
    public interface IGetBookingDetailByIdService
    {
        Task<BookingDetailDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
