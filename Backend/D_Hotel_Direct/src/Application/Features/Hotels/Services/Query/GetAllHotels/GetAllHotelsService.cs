using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels;
using Application.Features.Hotels.Repositories;
using Application.Features.Auth.Services.Query.CurrentUser;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetAllHotels
{
    public class GetAllHotelsService : IGetAllHotelsService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IHotelCategoryRepository _hotelCategoryRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetAllHotelsService(
            IHotelRepository hotelRepository,
            IHotelCategoryRepository hotelCategoryRepository,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _hotelRepository = hotelRepository;
            _hotelCategoryRepository = hotelCategoryRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var hotels = await _hotelRepository.GetAllAsync(cancellationToken);
            var hotelDtos = _mapper.Map<List<HotelDto>>(hotels);

            foreach (var hotelDto in hotelDtos)
            {
                var category = await _hotelCategoryRepository.GetByIdAsync(hotelDto.CategoryId, cancellationToken);
                hotelDto.CategoryName = category?.Name ?? "Unknown";

                var managerProfile = await _currentUserService.GetCurrentUserAsync(hotelDto.HotelManagerId, cancellationToken);
                hotelDto.HotelManagerName = managerProfile != null
                    ? $"{managerProfile.LastName} {managerProfile.FirstName}"
                    : "Unknown";
            }

            return hotelDtos;
        }
    }
}
