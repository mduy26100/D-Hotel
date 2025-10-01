using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.DeleteQuantityGuest;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using QuantityGuestEntity = Domain.Models.Rooms.QuantityGuest;

namespace Application.Features.Rooms.Services.Command.QuantityGuest.DeleteQuantityGuest
{
    public class DeleteQuantityGuestService : IDeleteQuantityGuestService
    {
        private readonly IQuantityGuestRepository _quantityGuestRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteQuantityGuestService(IQuantityGuestRepository quantityGuestRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _quantityGuestRepository = quantityGuestRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(QuantityGuestDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<QuantityGuestEntity>(dto);
            _quantityGuestRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
