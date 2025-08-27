using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.CreateHotelLocation;
using Application.Features.Places.Repositories;
using AutoMapper;
using Domain.Models.Places;

namespace Application.Features.Places.Services.Command.CreateHotelLocation
{
    public class CreateHotelLocationService : ICreateHotelLocationService
    {
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateHotelLocationService(IHotelLocationsRepository hotelLocationsRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelLocationsRepository = hotelLocationsRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<HotelLocationsDto> CreateAsync(HotelLocationsDto hotelLocationsDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelLocations>(hotelLocationsDto);
            await _hotelLocationsRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<HotelLocationsDto>(entity);
        }
    }
}
