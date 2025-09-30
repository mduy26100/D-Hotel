using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.CreateRoomTypePurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using RoomTypePurposeEnity = Domain.Models.Purposes.RoomTypePurpose;

namespace Application.Features.Purposes.Services.Command.RoomTypePurpose.CreateRoomTypePurpose
{
    public class CreateRoomTypePurposeService : ICreateRoomTypePurposeService
    {
        private readonly IRoomTypePurposeRepository _roomTypePurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRoomTypePurposeService(IRoomTypePurposeRepository roomTypePurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypePurposeRepository = roomTypePurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RoomTypePurposeDto> CreateAsync(RoomTypePurposeDto roomTypePurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypePurposeEnity>(roomTypePurposeDto);
            await _roomTypePurposeRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync();
            return _mapper.Map<RoomTypePurposeDto>(entity);
        }
    }
}
