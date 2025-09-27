using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffsByHotelId;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelStaffsByHotelId
{
    public class GetHotelStaffsByHotelIdQueryHandler : IRequestHandler<GetHotelStaffsByHotelIdQuery, IEnumerable<HotelStaffDto>>
    {
        private readonly IGetHotelStaffsByHotelIdService _getHotelStaffsByHotelIdService;

        public GetHotelStaffsByHotelIdQueryHandler(IGetHotelStaffsByHotelIdService getHotelStaffsByHotelIdService)
        {
            _getHotelStaffsByHotelIdService = getHotelStaffsByHotelIdService;
        }

        public async Task<IEnumerable<HotelStaffDto>> Handle(GetHotelStaffsByHotelIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelStaffsByHotelIdService.GetByHotelIdAsync(request.hotelId, cancellationToken);
        }
    }
}
