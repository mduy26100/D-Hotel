using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetAllQuantityGuests;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.QuantityGuest.GetAllQuantityGuests
{
    public class GetAllQuantityGuestsService : IGetAllQuantityGuestsService
    {
        private readonly IQuantityGuestRepository _quantityGuestRepository;
        private readonly IMapper _mapper;

        public GetAllQuantityGuestsService(IQuantityGuestRepository quantityGuestRepository
            , IMapper mapper)
        {
            _quantityGuestRepository = quantityGuestRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<QuantityGuestDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _quantityGuestRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<QuantityGuestDto>>(list);
        }
    }
}
