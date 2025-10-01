using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId
{
    internal class GetRoomImagesByRoomTypeIdService : IGetRoomImagesByRoomTypeIdService
    {
        private readonly IRoomTypeImageRepository _roomTypeImageRepository;
        private readonly IMapper _mapper;

        public GetRoomImagesByRoomTypeIdService(IRoomTypeImageRepository roomTypeImageRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeImageRepository = roomTypeImageRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomTypeImageDto>> GetByRoomTypeIdAsync(int roomTypeId, CancellationToken cancellationToken = default)
        {
            var entity = await _roomTypeImageRepository.FindAsync(h => h.RoomTypeId == roomTypeId, cancellationToken);
            return _mapper.Map<IEnumerable<RoomTypeImageDto>>(entity);
        }
    }
}
