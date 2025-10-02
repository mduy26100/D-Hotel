using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsById;

namespace Application.Features.Bookings.Services.Query.BookingDetail.GetBookingDetailsById
{
    public class GetBookingDetailsByIdService : IGetBookingDetailsByIdService
    {
        public Task<BookingDetailDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
