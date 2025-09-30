using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId
{
    public class GetRoomPurposeByRoomIdService : IGetRoomPurposeByRoomIdService
    {
        private readonly IRoomTypePurposeRepository _roomTypePurposeRepository;
        private readonly IMapper _mapper;

        public GetRoomPurposeByRoomIdService(IRoomTypePurposeRepository roomTypePurposeRepository
            , IMapper mapper)
        {
            _roomTypePurposeRepository = roomTypePurposeRepository;
            _mapper = mapper;
        }

        public async Task<RoomTypePurposeDto> GetRoomPurposeByRoomId(int roomId, CancellationToken cancellationToken = default)
        {
            var entity = await _roomTypePurposeRepository.GetByIdAsync(roomId, cancellationToken);
            return _mapper.Map<RoomTypePurposeDto>(entity);
        }
    }
}
