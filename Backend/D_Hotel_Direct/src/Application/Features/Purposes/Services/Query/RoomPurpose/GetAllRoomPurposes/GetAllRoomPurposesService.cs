using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetAllRoomPurposes;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.RoomPurpose.GetAllRoomPurposes
{
    public class GetAllRoomPurposesService : IGetAllRoomPurposesService
    {
        private readonly IRoomPurposeRepository _roomPurposeRepository;
        private readonly IMapper _mapper;

        public GetAllRoomPurposesService(IRoomPurposeRepository roomPurposeRepository
            , IMapper mapper)
        {
            _roomPurposeRepository = roomPurposeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomPurposeDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _roomPurposeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<RoomPurposeDto>>(list);
        }
    }
}
