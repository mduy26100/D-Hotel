using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByRoomId;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityByRoomId
{
    public class GetUtilityByRoomIdService : IGetUtilityByRoomIdService
    {
        private readonly IRoomUtilityRepository _roomUtilityItemRepository;
        private readonly IMapper _mapper;

        public GetUtilityByRoomIdService(IRoomUtilityRepository roomUtilityItemRepository
            , IMapper mapper)
        {
            _roomUtilityItemRepository = roomUtilityItemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomUtilityDto>> GetByIdAsync(int roomId, CancellationToken cancellationToken = default)
        {
            var roomUtilityItems = await _roomUtilityItemRepository.GetByRoomIdAsync(roomId, cancellationToken);
            return _mapper.Map<IEnumerable<RoomUtilityDto>>(roomUtilityItems);
        }
    }
}
