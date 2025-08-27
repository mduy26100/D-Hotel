using Application.Common.Interfaces.Persistence.EFCore;
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
            var entity = _mapper.Map<HotelLocations>(hotelLocationsDto);
            _hotelLocationsRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}
