using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.UpdateRoomType;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypeEntity = Domain.Models.Rooms.RoomType;

namespace Application.Features.Rooms.Services.Command.RoomType.UpdateRoomType
{
    public class UpdateRoomTypeService : IUpdateRoomTypeService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateRoomTypeService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(RoomTypeDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypeEntity>(dto);
            _roomTypeRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
