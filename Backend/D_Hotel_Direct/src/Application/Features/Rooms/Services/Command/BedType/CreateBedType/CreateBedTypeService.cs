using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.BedType.CreateBedType;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using BedTypeEntity = Domain.Models.Rooms.BedType;

namespace Application.Features.Rooms.Services.Command.BedType.CreateBedType
{
    public class CreateBedTypeService : ICreateBedTypeService
    {
        private readonly IBedTypeRepository _bedTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateBedTypeService(IBedTypeRepository bedTypeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _bedTypeRepository = bedTypeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<BedTypeDto> CreateAsync(BedTypeDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<BedTypeEntity>(dto);
            await _bedTypeRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<BedTypeDto>(entity);
        }
    }
}
