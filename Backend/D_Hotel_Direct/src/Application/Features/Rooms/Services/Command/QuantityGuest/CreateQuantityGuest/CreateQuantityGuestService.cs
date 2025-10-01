using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.CreateQuantityGuest;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using QuantityGuestEntity = Domain.Models.Rooms.QuantityGuest;

namespace Application.Features.Rooms.Services.Command.QuantityGuest.CreateQuantityGuest
{
    public class CreateQuantityGuestService : ICreateQuantityGuestService
    {
        private readonly IQuantityGuestRepository _quantityGuestRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateQuantityGuestService(IQuantityGuestRepository quantityGuestRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _quantityGuestRepository = quantityGuestRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<QuantityGuestDto> CreateAsync(QuantityGuestDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<QuantityGuestEntity>(dto);
            await _quantityGuestRepository.AddAsync(entity, cancellationToken);
            return _mapper.Map<QuantityGuestDto>(entity);
        }
    }
}
