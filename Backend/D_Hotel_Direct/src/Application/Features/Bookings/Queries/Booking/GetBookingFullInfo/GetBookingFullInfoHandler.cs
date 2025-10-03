using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingFullInfo;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingFullInfo
{
    public class GetBookingFullInfoHandler : IRequestHandler<GetBookingFullInfoQuery, BookingAggregateDto>
    {
        private readonly IGetBookingFullInfoService _getBookingFullInfoService;

        public GetBookingFullInfoHandler(IGetBookingFullInfoService getBookingFullInfoService)
        {
            _getBookingFullInfoService = getBookingFullInfoService;
        }

        public async Task<BookingAggregateDto> Handle(GetBookingFullInfoQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingFullInfoService.GetFullInfoAsync(request.bookingId, cancellationToken);
        }
    }
}
