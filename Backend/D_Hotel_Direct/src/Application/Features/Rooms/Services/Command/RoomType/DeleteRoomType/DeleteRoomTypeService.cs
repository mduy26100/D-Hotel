using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.DeleteRoomType;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypeEntity = Domain.Models.Rooms.RoomType;

namespace Application.Features.Rooms.Services.Command.RoomType.DeleteRoomType
{
    public class DeleteRoomTypeService : IDeleteRoomTypeService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteRoomTypeService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(RoomTypeDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypeEntity>(dto);
            _roomTypeRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
