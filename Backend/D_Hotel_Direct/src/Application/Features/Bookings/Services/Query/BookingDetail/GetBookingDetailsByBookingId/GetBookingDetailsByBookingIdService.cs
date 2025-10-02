using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsByBookingId;

namespace Application.Features.Bookings.Services.Query.BookingDetail.GetBookingDetailsByBookingId
{
    public class GetBookingDetailsByBookingIdService : IGetBookingDetailsByBookingIdService
    {
        public Task<IEnumerable<BookingDetailDto>> GetByBookingIdAsync(int bookingId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
