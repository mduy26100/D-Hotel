using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByDateRange;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingsByDateRange
{
    public class GetBookingsByDateRangeHandler : IRequestHandler<GetBookingsByDateRangeQuery, IEnumerable<BookingDto>>
    {
        private readonly IGetBookingsByDateRangeService _getBookingsByDateRangeService;

        public GetBookingsByDateRangeHandler(IGetBookingsByDateRangeService getBookingsByDateRangeService)
        {
            _getBookingsByDateRangeService = getBookingsByDateRangeService;
        }

        public async Task<IEnumerable<BookingDto>> Handle(GetBookingsByDateRangeQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingsByDateRangeService.GetByDateAsync(request.startDate, request.endDate, cancellationToken);
        }
    }
}
