using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityByHotelId
{
    public class GetUtilityByHotelIdService : IGetUtilityByHotelIdService
    {
        private readonly IHotelUtilityRepository _hotelUtilityRepository;
        private readonly IUtilityRepository _utilityRepository;
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;

        public GetUtilityByHotelIdService(
            IHotelUtilityRepository hotelUtilityRepository,
            IUtilityRepository utilityRepository,
            IUtilityItemRepository utilityItemRepository,
            IMapper mapper)
        {
            _hotelUtilityRepository = hotelUtilityRepository;
            _utilityRepository = utilityRepository;
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelUtilityDto>> GetByIdAsync(
            int hotelId,
            CancellationToken cancellationToken = default)
        {
            // 1️⃣ Lấy danh sách UtilityIds thuộc khách sạn
            var hotelUtilityItems = await _hotelUtilityRepository
                .FindAsync(h => h.HotelId == hotelId, cancellationToken);

            if (hotelUtilityItems == null || !hotelUtilityItems.Any())
                return Enumerable.Empty<HotelUtilityDto>();

            var utilityIds = hotelUtilityItems
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

            // 6️⃣ Trả về HotelUtilityDto chứa danh sách UtilityDto
            var result = new List<HotelUtilityDto>
            {
                new HotelUtilityDto
                {
                    HotelId = hotelId,
                    Utilities = utilityDtos.ToList()
                }
            };

            return result;
        }
    }
}
