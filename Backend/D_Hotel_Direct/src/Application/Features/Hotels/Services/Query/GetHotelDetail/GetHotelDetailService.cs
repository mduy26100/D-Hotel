using Application.Features.Auth.Services.Query.CurrentUser;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelDetail;
using Application.Features.Hotels.Repositories;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetTravelPurposeById;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId;

namespace Application.Features.Hotels.Services.Query.GetHotelDetail
{
    public class GetHotelDetailService : IGetHotelDetailService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IGetHotelsByCategoryIdService _getHotelsByCategoryIdService;
        private readonly IGetUtilityByHotelIdService _getUtilityByHotelIdService;
        private readonly IGetHotelLocationByHotelIdService _getHotelLocationByHotelIdService;
        private readonly IGetLocationByIdService _getLocationByIdService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IGetTravelPurposeByHotelIdService _getTravelPurposeByHotelIdService;
        private readonly IGetTravelPurposeByIdService _getTravelPurposeByIdService;
        private readonly IGetHotelCategoryByIdService _getHotelCategoryByIdService;

        public GetHotelDetailService(
            IHotelRepository hotelRepository,
            IGetHotelsByCategoryIdService getHotelsByCategoryIdService,
            IGetUtilityByHotelIdService getUtilityByHotelIdService,
            IGetHotelLocationByHotelIdService getHotelLocationByHotelIdService,
            IGetLocationByIdService getLocationByIdService,
            ICurrentUserService currentUserService,
            IGetTravelPurposeByHotelIdService getTravelPurposeByHotelIdService,
            IGetTravelPurposeByIdService getTravelPurposeByIdService,
            IGetHotelCategoryByIdService getHotelCategoryByIdService)
        {
            _hotelRepository = hotelRepository;
            _getHotelsByCategoryIdService = getHotelsByCategoryIdService;
            _getUtilityByHotelIdService = getUtilityByHotelIdService;
            _getHotelLocationByHotelIdService = getHotelLocationByHotelIdService;
            _getLocationByIdService = getLocationByIdService;
            _currentUserService = currentUserService;
            _getTravelPurposeByHotelIdService = getTravelPurposeByHotelIdService;
            _getTravelPurposeByIdService = getTravelPurposeByIdService;
            _getHotelCategoryByIdService = getHotelCategoryByIdService;
        }

        public async Task<HotelDetailDto?> GetHotelDetailAsync(int hotelId, CancellationToken cancellationToken = default)
        {
            var hotel = await _hotelRepository.GetByIdAsync(hotelId, cancellationToken);
            if (hotel == null)
                return null;

            var categoryHotel = await _getHotelCategoryByIdService.GetByIdAsync(hotel.CategoryId, cancellationToken);
            var categoryDto = categoryHotel != null
                ? new HotelCategoryDto
                {
                    Id = categoryHotel.Id,
                    Name = categoryHotel.Name
                }
                : new HotelCategoryDto
                {
                    Id = hotel.CategoryId,
                    Name = "Unknown"
                };


            var hotelUtilities = await _getUtilityByHotelIdService.GetByIdAsync(hotel.Id, cancellationToken);
            var utilityDtos = hotelUtilities.FirstOrDefault()?.Utilities ?? new List<UtilityDto>();

            var hotelLocationId = await _getHotelLocationByHotelIdService.GetByHotelIdAsync(hotel.Id, cancellationToken);
            var hotelLocation = await _getLocationByIdService.GetByIdAsync(hotelLocationId?.LocationId ?? 0, cancellationToken);

            var manager = await _currentUserService.GetCurrentUserAsync(hotel.HotelManagerId, cancellationToken);
            var managerName = manager != null
                ? $"{manager.LastName} {manager.FirstName}"
                : "Unknown";

            var travelPurposeId = await _getTravelPurposeByHotelIdService.GetTravelPurposeByHotelIdAsync(hotel.Id, cancellationToken);
            var hotelTravelPurpose = travelPurposeId != null
                ? await _getTravelPurposeByIdService.GetByIdAsync(travelPurposeId.TravelPurposeId, cancellationToken)
                : null;

            return new HotelDetailDto
            {
                Id = hotel.Id,
                Name = hotel.Name,
                Address = hotel.Address,
                Description = hotel.Description,
                ImgUrl = hotel.ImgUrl,
                IsActive = hotel.IsActive,
                HotelManagerName = managerName,
                Category = categoryDto,
                Location = hotelLocation == null
                    ? null
                    : new LocationsDto { Id = hotelLocation.Id, Name = hotelLocation.Name, ImgUrl = hotelLocation.ImgUrl },
                Utilities = utilityDtos,
                TravelPurpose = hotelTravelPurpose?.Name
            };
        }
    }
}
