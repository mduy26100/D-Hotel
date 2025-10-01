using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.BedType.DeleteBedType;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using BedTypeEntity = Domain.Models.Rooms.BedType;

namespace Application.Features.Rooms.Services.Command.BedType.DeleteBedType
{
    public class DeleteBedTypeService : IDeleteBedTypeService
    {
        private readonly IBedTypeRepository _bedTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteBedTypeService(IBedTypeRepository bedTypeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _bedTypeRepository = bedTypeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(BedTypeDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<BedTypeEntity>(dto);
            _bedTypeRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
