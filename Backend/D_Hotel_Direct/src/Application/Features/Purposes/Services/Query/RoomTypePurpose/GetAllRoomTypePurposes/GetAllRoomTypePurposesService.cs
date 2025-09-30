using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetAllRoomTypePurposes;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.RoomTypePurpose.GetAllRoomTypePurposes
{
    public class GetAllRoomTypePurposesService : IGetAllRoomTypePurposesService
    {
        private readonly IRoomTypePurposeRepository _roomTypePurposeRepository;
        private readonly IMapper _mapper;

        public GetAllRoomTypePurposesService(IRoomTypePurposeRepository roomTypePurposeRepository
            , IMapper mapper)
        {
            _roomTypePurposeRepository = roomTypePurposeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomTypePurposeDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _roomTypePurposeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<RoomTypePurposeDto>>(list);
        }
    }
}
