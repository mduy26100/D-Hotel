using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityItemsByUtilityId;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityItemsByUtilityId
{
    public class GetUtilityItemsByUtilityIdQueryHandler : IRequestHandler<GetUtilityItemsByUtilityIdQuery, IEnumerable<UtilityItemDto>>
    {
        private readonly IGetUtilityItemsByUtilityIdService _getUtilityItemsByUtilityIdService;

        public GetUtilityItemsByUtilityIdQueryHandler(IGetUtilityItemsByUtilityIdService getUtilityItemsByUtilityIdService)
        {
            _getUtilityItemsByUtilityIdService = getUtilityItemsByUtilityIdService;
        }

        public async Task<IEnumerable<UtilityItemDto>> Handle(GetUtilityItemsByUtilityIdQuery request, CancellationToken cancellationToken)
        {
            return await _getUtilityItemsByUtilityIdService.GetByUtilityIdAsync(request.utilityId, cancellationToken);
        }
    }
}
