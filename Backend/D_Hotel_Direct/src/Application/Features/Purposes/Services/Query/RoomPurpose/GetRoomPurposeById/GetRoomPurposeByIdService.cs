using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetRoomPurposeById;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.RoomPurpose.GetRoomPurposeById
{
    public class GetRoomPurposeByIdService : IGetRoomPurposeByIdService
    {
        private readonly IRoomPurposeRepository _roomPurposeRepository;
        private readonly IMapper _mapper;

        public GetRoomPurposeByIdService(IRoomPurposeRepository roomPurposeRepository
            , IMapper mapper)
        {
            _roomPurposeRepository = roomPurposeRepository;
            _mapper = mapper;
        }

        public async Task<RoomPurposeDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _roomPurposeRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<RoomPurposeDto>(entity);
        }
    }
}
