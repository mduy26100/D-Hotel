using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingById;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingById
{
    public class GetBookingByIdHandler : IRequestHandler<GetBookingByIdQuery, BookingDto>
    {
        private readonly IGetBookingByIdService _getBookingByIdService;

        public GetBookingByIdHandler(IGetBookingByIdService getBookingByIdService)
        {
            _getBookingByIdService = getBookingByIdService;
        }

        public async Task<BookingDto> Handle(GetBookingByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
