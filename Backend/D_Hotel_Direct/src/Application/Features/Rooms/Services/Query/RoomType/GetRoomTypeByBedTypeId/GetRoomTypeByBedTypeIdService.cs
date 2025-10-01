using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByBedTypeId;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeByBedTypeId
{
    internal class GetRoomTypeByBedTypeIdService : IGetRoomTypeByBedTypeIdService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetRoomTypeByBedTypeIdService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<RoomTypeDto> GetByBedTypeIdAsync(int bedTypeId, CancellationToken cancellationToken = default)
        {
            var entity = await _roomTypeRepository.AnyAsync(h => h.BedTypeId == bedTypeId, cancellationToken);
            return _mapper.Map<RoomTypeDto>(entity);
        }
    }
}
