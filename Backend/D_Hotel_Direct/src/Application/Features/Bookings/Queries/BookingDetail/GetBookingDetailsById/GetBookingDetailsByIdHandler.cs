using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsById;
using MediatR;

namespace Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailsById
{
    public class GetBookingDetailsByIdHandler : IRequestHandler<GetBookingDetailsByIdQuery, BookingDetailDto>
    {
        private readonly IGetBookingDetailsByIdService _getBookingDetailsByIdService;

        public GetBookingDetailsByIdHandler(IGetBookingDetailsByIdService getBookingDetailsByIdService)
        {
            _getBookingDetailsByIdService = getBookingDetailsByIdService;
        }

        public async Task<BookingDetailDto> Handle(GetBookingDetailsByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingDetailsByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
