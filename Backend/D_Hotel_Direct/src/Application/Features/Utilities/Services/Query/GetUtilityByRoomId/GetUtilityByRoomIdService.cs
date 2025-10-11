using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByRoomId;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityByRoomId
{
    public class GetUtilityByRoomIdService : IGetUtilityByRoomIdService
    {
        private readonly IRoomUtilityRepository _roomUtilityRepository;
        private readonly IUtilityRepository _utilityRepository;
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;

        public GetUtilityByRoomIdService(
            IRoomUtilityRepository roomUtilityRepository,
            IUtilityRepository utilityRepository,
            IUtilityItemRepository utilityItemRepository,
            IMapper mapper)
        {
            _roomUtilityRepository = roomUtilityRepository;
            _utilityRepository = utilityRepository;
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomUtilityDto>> GetByIdAsync(
            int roomId,
            CancellationToken cancellationToken = default)
        {
            // 1️⃣ Lấy danh sách UtilityIds thuộc phòng
            var roomUtilityItems = await _roomUtilityRepository
                .FindAsync(h => h.RoomId == roomId, cancellationToken);

            if (roomUtilityItems == null || !roomUtilityItems.Any())
                return Enumerable.Empty<RoomUtilityDto>();

            var utilityIds = roomUtilityItems
                .Select(x => x.UtilityId)
                .Distinct()
                .ToList();

            // 2️⃣ Lấy danh sách Utility theo Ids
            var utilities = await _utilityRepository.FindAsync(
                u => utilityIds.Contains(u.Id), cancellationToken);

            // 3️⃣ Lấy tất cả UtilityItem liên quan
            var allUtilityItems = await _utilityItemRepository.FindAsync(
                ui => utilityIds.Contains(ui.UtilityId), cancellationToken);

            // 4️⃣ Map sang DTO
            var utilityDtos = _mapper.Map<IEnumerable<UtilityDto>>(utilities);

            // 5️⃣ Gắn UtilityItems cho từng Utility
            foreach (var utilityDto in utilityDtos)
            {
                var items = allUtilityItems
                    .Where(item => item.UtilityId == utilityDto.Id)
                    .Select(item => item.Name)
                    .ToList();

                utilityDto.UtilityItems = items;
            }

            // 6️⃣ Trả về RoomUtilityDto chứa danh sách UtilityDto
            var result = new List<RoomUtilityDto>
            {
                new RoomUtilityDto
                {
                    RoomId = roomId,
                    Utilities = utilityDtos.ToList()
                }
            };

            return result;
        }
    }
}
