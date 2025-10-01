using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByQuantityGuestId;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeByQuantityGuestId
{
    public class GetRoomTypeByQuantityGuestIdService : IGetRoomTypeByQuantityGuestIdService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetRoomTypeByQuantityGuestIdService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<RoomTypeDto> GetByQuantityGuestIdAsync(int quantityGuestId, CancellationToken cancellationToken = default)
        {
            var entity = await _roomTypeRepository.AnyAsync(h => h.QuantityGuestId == quantityGuestId, cancellationToken);
            return _mapper.Map<RoomTypeDto>(entity);
        }
    }
}
