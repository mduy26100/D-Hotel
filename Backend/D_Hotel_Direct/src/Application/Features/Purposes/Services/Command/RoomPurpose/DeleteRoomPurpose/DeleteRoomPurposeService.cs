using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.DeleteRoomPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using RoomPurposeEntity = Domain.Models.Purposes.RoomPurpose;

namespace Application.Features.Purposes.Services.Command.RoomPurpose.DeleteRoomPurpose
{
    public class DeleteRoomPurposeService : IDeleteRoomPurposeService
    {
        private readonly IRoomPurposeRepository _roomPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteRoomPurposeService(IRoomPurposeRepository roomPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomPurposeRepository = roomPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(RoomPurposeDto roomPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomPurposeEntity>(roomPurposeDto);
            _roomPurposeRepository.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
