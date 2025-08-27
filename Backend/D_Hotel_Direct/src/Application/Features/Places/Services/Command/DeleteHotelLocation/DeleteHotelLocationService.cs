using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.DeleteHotelLocation;
using Application.Features.Places.Repositories;
using AutoMapper;
using Domain.Models.Places;

namespace Application.Features.Places.Services.Command.DeleteHotelLocation
{
    public class DeleteHotelLocationService : IDeleteHotelLocationService
    {
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteHotelLocationService(IHotelLocationsRepository hotelLocationsRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelLocationsRepository = hotelLocationsRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(HotelLocationsDto hotelLocationsDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelLocations>(hotelLocationsDto);
            _hotelLocationsRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}
