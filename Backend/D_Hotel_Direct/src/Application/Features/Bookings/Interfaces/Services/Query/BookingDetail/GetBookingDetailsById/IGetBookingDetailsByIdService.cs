using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsById
{
    public interface IGetBookingDetailsByIdService
    {
        Task<BookingDetailDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
