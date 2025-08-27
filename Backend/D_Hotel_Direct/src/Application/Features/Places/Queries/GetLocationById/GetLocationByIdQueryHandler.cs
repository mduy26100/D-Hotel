using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using MediatR;

namespace Application.Features.Places.Queries.GetLocationById
{
    public class GetLocationByIdQueryHandler : IRequestHandler<GetLocationByIdQuery, LocationsDto>
    {
        private readonly IGetLocationByIdService _getLocationByIdService;

        public GetLocationByIdQueryHandler(IGetLocationByIdService getLocationByIdService)
        {
            _getLocationByIdService = getLocationByIdService;
        }

        public async Task<LocationsDto> Handle(GetLocationByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getLocationByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
