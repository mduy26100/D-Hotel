using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Repositories;
using Application.Features.Places.DTOs;
using Application.Features.Places.Repositories;
using Application.Features.Shared.DTOs;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Repositories;
using MediatR;

namespace Application.Features.Shared.Queries.GetHotelDetail
{
    public class GetHotelDetailQueryHandler : IRequestHandler<GetHotelDetailQuery, HotelDetailDto?>
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IHotelUtilityRepository _hotelUtilityRepository;
        private readonly IHotelCategoryRepository _hotelCategoryRepository;
        private readonly IUtilityRepository _utilityRepository;
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly ILocationsRepository _locationsRepository;

        public GetHotelDetailQueryHandler(
            IHotelRepository hotelRepository,
            IHotelUtilityRepository hotelUtilityRepository,
            IHotelCategoryRepository hotelCategoryRepository,
            IUtilityRepository utilityRepository,
            IUtilityItemRepository utilityItemRepository,
            IHotelLocationsRepository hotelLocationsRepository,
            ILocationsRepository locationsRepository)
        {
            _hotelRepository = hotelRepository;
            _hotelUtilityRepository = hotelUtilityRepository;
            _hotelCategoryRepository = hotelCategoryRepository;
            _utilityRepository = utilityRepository;
            _utilityItemRepository = utilityItemRepository;
            _hotelLocationsRepository = hotelLocationsRepository;
            _locationsRepository = locationsRepository;
        }

        public async Task<HotelDetailDto?> Handle(GetHotelDetailQuery request, CancellationToken cancellationToken)
        {
            var hotel = await _hotelRepository.GetByIdAsync(request.Id, cancellationToken);
            if (hotel == null)
                return null;

            // Category
            var category = await _hotelCategoryRepository.GetByIdAsync(hotel.CategoryId, cancellationToken);

            // Utilities
            var hotelUtilities = await _hotelUtilityRepository.GetByHotelIdAsync(request.Id, cancellationToken);
            var utilityIds = hotelUtilities.Select(hu => hu.UtilityId).Distinct().ToList();

            var utilities = await _utilityRepository.GetManyByIdsAsync(utilityIds, cancellationToken);
            var utilityItems = await _utilityItemRepository.GetByUtilityIdListAsync(utilityIds, cancellationToken);

            var groupedItems = utilityItems.GroupBy(ui => ui.UtilityId)
                                           .ToDictionary(g => g.Key, g => g.Select(ui => ui.Name).ToList());

            var utilityDtos = utilities.Select(utility => new UtilityDto
            {
                Id = utility.Id,
                Name = utility.Name,
                IconUrl = utility.IconUrl,
                UtilityItems = groupedItems.TryGetValue(utility.Id, out var items) ? items : new List<string>()
            }).ToList();

            // Location (1 hotel chỉ có 1 location)
            LocationsDto? locationDto = null;
            var hotelLocationMapping = await _hotelLocationsRepository.GetByHotelIdAsync(hotel.Id, cancellationToken);
            if (hotelLocationMapping != null)
            {
                var loc = await _locationsRepository.GetByIdAsync(hotelLocationMapping.LocationId, cancellationToken);
                if (loc != null)
                {
                    locationDto = new LocationsDto
                    {
                        Id = loc.Id,
                        Name = loc.Name,
                        ImgUrl = loc.ImgUrl
                    };
                }
            }

            // Final DTO
            return new HotelDetailDto
            {
                Id = hotel.Id,
                Name = hotel.Name,
                Address = hotel.Address,
                HotelManagerId = hotel.HotelManagerId,
                Description = hotel.Description,
                ImgUrl = hotel.ImgUrl,
                IsActive = hotel.IsActive,
                Category = category == null
                    ? new HotelCategoryDto { Id = 0, Name = "Unknown" }
                    : new HotelCategoryDto { Id = category.Id, Name = category.Name },
                Utilities = utilityDtos,
                Location = locationDto
            };
        }
    }
}
