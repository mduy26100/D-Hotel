using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypePrice.GetAllRoomTypePrices;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomTypePrice.GetAllRoomTypePrices
{
    public class GetAllRoomTypePricesService : IGetAllRoomTypePricesService
    {
        private readonly IRoomTypePriceRepository _roomTypePriceRepository;
        private readonly IMapper _mapper;

        public GetAllRoomTypePricesService(IRoomTypePriceRepository roomTypePriceRepository,
            IMapper mapper)
        {
            _roomTypePriceRepository = roomTypePriceRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomTypePriceDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _roomTypePriceRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<RoomTypePriceDto>>(entities);
        }
    }
}
