using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetQuantityGuestById;
using MediatR;

namespace Application.Features.Rooms.Queries.QuantityGuest.GetQuantityGuestById
{
    public class GetQuantityGuestByIdHandler : IRequestHandler<GetQuantityGuestByIdQuery, QuantityGuestDto>
    {
        private readonly IGetQuantityGuestByIdService _getQuantityGuestByIdService;

        public GetQuantityGuestByIdHandler(IGetQuantityGuestByIdService getQuantityGuestByIdService)
        {
            _getQuantityGuestByIdService = getQuantityGuestByIdService;
        }

        public async Task<QuantityGuestDto> Handle(GetQuantityGuestByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getQuantityGuestByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
