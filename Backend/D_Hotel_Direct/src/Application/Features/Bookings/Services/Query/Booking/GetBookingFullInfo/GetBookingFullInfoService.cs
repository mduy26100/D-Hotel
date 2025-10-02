using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingFullInfo;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingFullInfo
{
    public class GetBookingFullInfoService : IGetBookingFullInfoService
    {
        public Task<BookingInfoDto> GetFullInfoAsync(int bookingId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
