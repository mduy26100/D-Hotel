using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetAllQuantityGuests;
using MediatR;

namespace Application.Features.Rooms.Queries.QuantityGuest.GetAllQuantityGuests
{
    public class GetAllQuantityGuestsHandler : IRequestHandler<GetAllQuantityGuestsQuery, IEnumerable<QuantityGuestDto>>
    {
        private readonly IGetAllQuantityGuestsService _getAllQuantityGuestsService;

        public GetAllQuantityGuestsHandler(IGetAllQuantityGuestsService getAllQuantityGuestsService)
        {
            _getAllQuantityGuestsService = getAllQuantityGuestsService;
        }

        public async Task<IEnumerable<QuantityGuestDto>> Handle(GetAllQuantityGuestsQuery request, CancellationToken cancellationToken)
        {
            return await _getAllQuantityGuestsService.GetAllAsync(cancellationToken);
        }
    }
}
