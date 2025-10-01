using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeById;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeById
{
    public class GetRoomTypeByIdService : IGetRoomTypeByIdService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetRoomTypeByIdService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<RoomTypeDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _roomTypeRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<RoomTypeDto>(entity);
        }
    }
}
