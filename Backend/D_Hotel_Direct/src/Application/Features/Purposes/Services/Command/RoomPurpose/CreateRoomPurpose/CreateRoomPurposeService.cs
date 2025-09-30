using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.CreateRoomPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using RoomPurposeEntity = Domain.Models.Purposes.RoomPurpose;

namespace Application.Features.Purposes.Services.Command.RoomPurpose.CreateRoomPurpose
{
    public class CreateRoomPurposeService : ICreateRoomPurposeService
    {
        private readonly IRoomPurposeRepository _roomPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRoomPurposeService(IRoomPurposeRepository roomPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomPurposeRepository = roomPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RoomPurposeDto> CreateAsync(RoomPurposeDto roomPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomPurposeEntity>(roomPurposeDto);
            await _roomPurposeRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<RoomPurposeDto>(entity);
        }
    }
}
