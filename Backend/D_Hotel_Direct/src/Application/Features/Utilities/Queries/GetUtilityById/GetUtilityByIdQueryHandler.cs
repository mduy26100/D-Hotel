using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityById;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityById
{
    public class GetUtilityByIdQueryHandler : IRequestHandler<GetUtilityByIdQuery, UtilityDto?>
    {
        private readonly IGetUtilityByIdService _getUtilityByIdService;

        public GetUtilityByIdQueryHandler(IGetUtilityByIdService getUtilityByIdService)
        {
            _getUtilityByIdService = getUtilityByIdService;
        }

        public async Task<UtilityDto?> Handle(GetUtilityByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getUtilityByIdService.GetByIdAsync(request.Id, cancellationToken);
        }
    }
}
