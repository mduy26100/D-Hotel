using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.UpdateQuantityGuest;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using QuantityGuestEntity = Domain.Models.Rooms.QuantityGuest;

namespace Application.Features.Rooms.Services.Command.QuantityGuest.UpdateQuantityGuest
{
    public class UpdateQuantityGuestService : IUpdateQuantityGuestService
    {
        private readonly IQuantityGuestRepository _quantityGuestRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateQuantityGuestService(IQuantityGuestRepository quantityGuestRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _quantityGuestRepository = quantityGuestRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(QuantityGuestDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<QuantityGuestEntity>(dto);
            _quantityGuestRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
