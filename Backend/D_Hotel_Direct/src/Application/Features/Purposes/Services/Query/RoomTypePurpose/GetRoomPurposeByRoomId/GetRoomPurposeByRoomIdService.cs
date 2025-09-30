using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetRoomPurposeById;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId
{
    public class GetRoomPurposeByRoomIdService : IGetRoomPurposeByIdService
    {
        private readonly IRoomTypePurposeRepository _roomTypePurposeRepository;
        private readonly IMapper _mapper;

        public GetRoomPurposeByRoomIdService(IRoomTypePurposeRepository roomTypePurposeRepository
            , IMapper mapper)
        {
            _roomTypePurposeRepository = roomTypePurposeRepository;
            _mapper = mapper;
        }

        public async Task<RoomPurposeDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _roomTypePurposeRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<RoomPurposeDto>(entity);
        }
    }
}
