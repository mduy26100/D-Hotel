using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetAllRoomTypes;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomType.GetAllRoomTypes
{
    internal class GetAllRoomTypesService : IGetAllRoomTypesService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetAllRoomTypesService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomTypeDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _roomTypeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<RoomTypeDto>>(list);
        }
    }
}
