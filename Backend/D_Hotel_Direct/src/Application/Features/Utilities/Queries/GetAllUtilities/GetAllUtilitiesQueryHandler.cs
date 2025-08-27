using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetAllUtilities;
using MediatR;

namespace Application.Features.Utilities.Queries.GetAllUtilities
{
    public class GetAllUtilitiesQueryHandler : IRequestHandler<GetAllUtilitiesQuery, IEnumerable<UtilityDto>>
    {
        private readonly IGetAllUtilitiesService _getAllUtilitiesService;

        public GetAllUtilitiesQueryHandler(IGetAllUtilitiesService getAllUtilitiesService)
        {
            _getAllUtilitiesService = getAllUtilitiesService;
        }

        public async Task<IEnumerable<UtilityDto>> Handle(GetAllUtilitiesQuery request, CancellationToken cancellationToken)
        {
            return await _getAllUtilitiesService.GetAllAsync(cancellationToken);
        }
    }
}
