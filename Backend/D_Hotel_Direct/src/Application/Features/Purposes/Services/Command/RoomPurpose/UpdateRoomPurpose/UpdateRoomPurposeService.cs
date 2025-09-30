using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.UpdateRoomPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using RoomPurposeEntity = Domain.Models.Purposes.RoomPurpose;

namespace Application.Features.Purposes.Services.Command.RoomPurpose.UpdateRoomPurpose
{
    public class UpdateRoomPurposeService : IUpdateRoomPurposeService
    {
        private readonly IRoomPurposeRepository _roomPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateRoomPurposeService(IRoomPurposeRepository roomPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomPurposeRepository = roomPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(RoomPurposeDto roomPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomPurposeEntity>(roomPurposeDto);
            _roomPurposeRepository.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
