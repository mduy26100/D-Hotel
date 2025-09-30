using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetTravelPurposeById;
using MediatR;

namespace Application.Features.Purposes.Queries.TravelPurpose.GetTravelPurposeById
{
    public class GetTravelPurposeByIdHandler : IRequestHandler<GetTravelPurposeByIdQuery, TravelPurposeDto>
    {
        private readonly IGetTravelPurposeByIdService _getTravelPurposeByIdService;

        public GetTravelPurposeByIdHandler(IGetTravelPurposeByIdService getTravelPurposeByIdService)
        {
            _getTravelPurposeByIdService = getTravelPurposeByIdService;
        }

        public async Task<TravelPurposeDto> Handle(GetTravelPurposeByIdQuery request, CancellationToken cancellationToken)
        {
            var travelPurpose = await _getTravelPurposeByIdService.GetByIdAsync(request.id, cancellationToken);
            return travelPurpose;
        }
    }
}
