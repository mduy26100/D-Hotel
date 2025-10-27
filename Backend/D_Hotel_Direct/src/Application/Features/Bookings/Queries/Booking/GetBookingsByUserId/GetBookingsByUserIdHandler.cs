using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingsByUserId
{
    public class GetBookingsByUserIdHandler : IRequestHandler<GetBookingsByUserIdQuery, IEnumerable<BookingDto>>
    {
        private readonly IGetBookingsByUserIdService _getBookingsByUserIdService;
        private readonly ICurrentUserContext _currentUserContext;

        public GetBookingsByUserIdHandler(IGetBookingsByUserIdService getBookingsByUserIdService, ICurrentUserContext currentUserContext)
        {
            _getBookingsByUserIdService = getBookingsByUserIdService;
            _currentUserContext = currentUserContext;
        }

        public async Task<IEnumerable<BookingDto>> Handle(GetBookingsByUserIdQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserContext.UserId;
            return await _getBookingsByUserIdService.GetByUserIdAsync(userId, cancellationToken);
        }
    }
}
