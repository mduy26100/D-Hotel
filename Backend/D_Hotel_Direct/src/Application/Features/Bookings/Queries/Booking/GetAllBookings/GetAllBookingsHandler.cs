using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetAllBookings;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetAllBookings
{
    public class GetAllBookingsHandler : IRequestHandler<GetAllBookingsQuery, IEnumerable<BookingDto>>
    {
        private readonly IGetAllBookingsService _getAllBookingsService;

        public GetAllBookingsHandler(IGetAllBookingsService getAllBookingsService)
        {
            _getAllBookingsService = getAllBookingsService;
        }

        public async Task<IEnumerable<BookingDto>> Handle(GetAllBookingsQuery request, CancellationToken cancellationToken)
        {
            return await _getAllBookingsService.GetAllAsync(cancellationToken);
        }
    }
}
