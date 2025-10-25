using Application.Features.Auth.Services.Query.CurrentUser;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using Application.Features.Hotels.Repositories;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetTravelPurposeById;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId;

namespace Application.Features.Hotels.Services.Query.GetAllHotels
{
    public class GetAllHotelsService : IGetAllHotelsService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IGetHotelCategoryByIdService _getHotelCategoryByIdService;
        private readonly IGetUtilityByHotelIdService _getUtilityByHotelIdService;
        private readonly IGetHotelLocationByHotelIdService _getHotelLocationByHotelIdService;
        private readonly IGetLocationByIdService _getLocationByIdService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IGetTravelPurposeByHotelIdService _getTravelPurposeByHotelIdService;
        private readonly IGetTravelPurposeByIdService _getTravelPurposeByIdService;

        public GetAllHotelsService(
            IHotelRepository hotelRepository,
            IGetHotelCategoryByIdService getHotelCategoryByIdService,
            IGetUtilityByHotelIdService getUtilityByHotelIdService,
            IGetHotelLocationByHotelIdService getHotelLocationByHotelIdService,
            IGetLocationByIdService getLocationByIdService,
            ICurrentUserService currentUserService,
            IGetTravelPurposeByHotelIdService getTravelPurposeByHotelIdService,
            IGetTravelPurposeByIdService getTravelPurposeByIdService)
        {
            _hotelRepository = hotelRepository;
            _getHotelCategoryByIdService = getHotelCategoryByIdService;
            _getUtilityByHotelIdService = getUtilityByHotelIdService;
            _getHotelLocationByHotelIdService = getHotelLocationByHotelIdService;
            _getLocationByIdService = getLocationByIdService;
            _currentUserService = currentUserService;
            _getTravelPurposeByHotelIdService = getTravelPurposeByHotelIdService;
            _getTravelPurposeByIdService = getTravelPurposeByIdService;
        }

        public async Task<IEnumerable<HotelDetailDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var hotels = await _hotelRepository.GetAllAsync(cancellationToken);

            var activeHotels = hotels.Where(h => h.IsActive).ToList();

            var hotelDetails = new List<HotelDetailDto>();

            foreach (var hotel in activeHotels)
            {
                var category = await _getHotelCategoryByIdService.GetByIdAsync(hotel.CategoryId, cancellationToken);
                var categoryDto = category != null
                    ? new HotelCategoryDto { Id = category.Id, Name = category.Name }
                    : new HotelCategoryDto { Id = hotel.CategoryId, Name = "Unknown" };

                var utilities = await _getUtilityByHotelIdService.GetByIdAsync(hotel.Id, cancellationToken);
                var utilityDtos = utilities.FirstOrDefault()?.Utilities ?? new List<UtilityDto>();

                var hotelLocationId = await _getHotelLocationByHotelIdService.GetByHotelIdAsync(hotel.Id, cancellationToken);
                var location = await _getLocationByIdService.GetByIdAsync(hotelLocationId?.LocationId ?? 0, cancellationToken);

                var manager = await _currentUserService.GetCurrentUserAsync(hotel.HotelManagerId, cancellationToken);
                var managerName = manager != null ? $"{manager.LastName} {manager.FirstName}" : "Unknown";

                var travelPurposeId = await _getTravelPurposeByHotelIdService.GetTravelPurposeByHotelIdAsync(hotel.Id, cancellationToken);
                var travelPurpose = travelPurposeId != null
                    ? await _getTravelPurposeByIdService.GetByIdAsync(travelPurposeId.TravelPurposeId, cancellationToken)
                    : null;

                var travelPurposeDto = travelPurpose != null
                    ? new TravelPurposeDto { Id = travelPurpose.Id, Name = travelPurpose.Name }
                    : null;

                hotelDetails.Add(new HotelDetailDto
                {
                    Id = hotel.Id,
                    Name = hotel.Name,
                    Address = hotel.Address,
                    Description = hotel.Description,
                    ImgUrl = hotel.ImgUrl,
                    IsActive = hotel.IsActive,
                    HotelManagerName = managerName,
                    Category = categoryDto,
                    Location = location == null
                        ? null
                        : new LocationsDto { Id = location.Id, Name = location.Name, ImgUrl = location.ImgUrl },
                    Utilities = utilityDtos,
                    TravelPurpose = travelPurposeDto
                });
            }

            return hotelDetails;
        }
    }
}
