using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailById;
using MediatR;

namespace Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailById
{
    public class GetBookingDetailByIdHandler : IRequestHandler<GetBookingDetailByIdQuery, BookingDetailDto>
    {
        private readonly IGetBookingDetailByIdService _getBookingDetailsByIdService;

        public GetBookingDetailByIdHandler(IGetBookingDetailByIdService getBookingDetailsByIdService)
        {
            _getBookingDetailsByIdService = getBookingDetailsByIdService;
        }

        public async Task<BookingDetailDto> Handle(GetBookingDetailByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getBookingDetailsByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
