using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityByHotelId
{
    public class GetUtilityByHotelIdQueryHandler : IRequestHandler<GetUtilityByHotelIdQuery, IEnumerable<HotelUtilityDto>>
    {
        private readonly IGetUtilityByHotelIdService _getUtilityItemsByHotelIdService;

        public GetUtilityByHotelIdQueryHandler(IGetUtilityByHotelIdService getUtilityItemsByHotelIdService)
        {
            _getUtilityItemsByHotelIdService = getUtilityItemsByHotelIdService;
        }

        public async Task<IEnumerable<HotelUtilityDto>> Handle(GetUtilityByHotelIdQuery request, CancellationToken cancellationToken)
        {
            return await _getUtilityItemsByHotelIdService.GetByIdAsync(request.hotelId, cancellationToken);
        }
    }
}
