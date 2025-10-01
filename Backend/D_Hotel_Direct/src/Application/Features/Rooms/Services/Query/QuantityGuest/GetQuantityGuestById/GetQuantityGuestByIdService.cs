using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetQuantityGuestById;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.QuantityGuest.GetQuantityGuestById
{
    internal class GetQuantityGuestByIdService : IGetQuantityGuestByIdService
    {
        private readonly IQuantityGuestRepository _quantityGuestRepository;
        private readonly IMapper _mapper;

        public GetQuantityGuestByIdService(IQuantityGuestRepository quantityGuestRepository
            , IMapper mapper)
        {
            _quantityGuestRepository = quantityGuestRepository;
            _mapper = mapper;
        }

        public async Task<QuantityGuestDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _quantityGuestRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<QuantityGuestDto>(entity);
        }
    }
}
