using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.BedType.UpdateBedType;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using BedTypeEntity = Domain.Models.Rooms.BedType;

namespace Application.Features.Rooms.Services.Command.BedType.UpdateBedType
{
    public class UpdateBedTypeService : IUpdateBedTypeService
    {
        private readonly IBedTypeRepository _bedTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateBedTypeService(IBedTypeRepository bedTypeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _bedTypeRepository = bedTypeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(BedTypeDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<BedTypeEntity>(dto);
            _bedTypeRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
