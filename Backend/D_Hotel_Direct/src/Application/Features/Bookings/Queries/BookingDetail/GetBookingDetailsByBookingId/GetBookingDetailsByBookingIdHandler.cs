using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsByBookingId;
using MediatR;

namespace Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailsByBookingId
{
    public class GetBookingDetailsByBookingIdHandler : IRequestHandler<GetBookingDetailsByBookingIdQuery, IEnumerable<BookingDetailDto>>
    {
        private readonly IGetBookingDetailsByBookingIdService _getBookingDetailsByBookingIdService;

        public GetBookingDetailsByBookingIdHandler(IGetBookingDetailsByBookingIdService getBookingDetailsByBookingIdService)
        {
            _getBookingDetailsByBookingIdService = getBookingDetailsByBookingIdService;
        }

        public async Task<IEnumerable<BookingDetailDto>> Handle(GetBookingDetailsByBookingIdQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingDetailsByBookingIdService.GetByBookingIdAsync(request.bookingId, cancellationToken);
        }
    }
}
