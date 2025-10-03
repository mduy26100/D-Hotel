using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingsByUserId
{
    public class GetBookingsByUserIdHandler : IRequestHandler<GetBookingsByUserIdQuery, IEnumerable<BookingDto>>
    {
        private readonly IGetBookingsByUserIdService _getBookingsByUserIdService;

        public GetBookingsByUserIdHandler(IGetBookingsByUserIdService getBookingsByUserIdService)
        {
            _getBookingsByUserIdService = getBookingsByUserIdService;
        }

        public async Task<IEnumerable<BookingDto>> Handle(GetBookingsByUserIdQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingsByUserIdService.GetByUserIdAsync(request.userId, cancellationToken);
        }
    }
}
