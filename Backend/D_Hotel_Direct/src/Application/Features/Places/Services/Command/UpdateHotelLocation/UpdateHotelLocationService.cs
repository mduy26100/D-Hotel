using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.UpdateHotelLocation;
using Application.Features.Places.Repositories;
using AutoMapper;
using Domain.Models.Places;

namespace Application.Features.Places.Services.Command.UpdateHotelLocation
{
    public class UpdateHotelLocationService : IUpdateHotelLocationService
    {
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateHotelLocationService(IHotelLocationsRepository hotelLocationsRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelLocationsRepository = hotelLocationsRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(HotelLocationsDto hotelLocationsDto, CancellationToken cancellationToken = default)
        {
            var oldEntity = await _hotelLocationsRepository
                .FindOneAsync(h => h.HotelId == hotelLocationsDto.HotelId, cancellationToken);

            if (oldEntity != null)
            {
                _hotelLocationsRepository.Remove(oldEntity);

                var newEntity = new HotelLocations
                {
                    HotelId = hotelLocationsDto.HotelId,
                    LocationId = hotelLocationsDto.LocationId
                };
                await _hotelLocationsRepository.AddAsync(newEntity);

                await _context.SaveChangesAsync(cancellationToken);
            }
        }

    }
}
