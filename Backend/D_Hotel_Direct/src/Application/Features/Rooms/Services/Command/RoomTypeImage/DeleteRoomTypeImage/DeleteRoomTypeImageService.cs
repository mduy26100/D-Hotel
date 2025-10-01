using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.DeleteRoomTypeImage;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypeImageEntity = Domain.Models.Rooms.RoomTypeImage;

namespace Application.Features.Rooms.Services.Command.RoomTypeImage.DeleteRoomTypeImage
{
    public class DeleteRoomTypeImageService : IDeleteRoomTypeImageService
    {
        private readonly IRoomTypeImageRepository _roomTypeImageRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteRoomTypeImageService(IRoomTypeImageRepository roomTypeImageRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeImageRepository = roomTypeImageRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(RoomTypeImageDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypeImageEntity>(dto);
            _roomTypeImageRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
