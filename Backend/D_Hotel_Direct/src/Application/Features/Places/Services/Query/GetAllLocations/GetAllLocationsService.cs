using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetAllLocations;
using Application.Features.Places.Repositories;
using AutoMapper;

namespace Application.Features.Places.Services.Query.GetAllLocations
{
    public class GetAllLocationsService : IGetAllLocationsService
    {
        private readonly ILocationsRepository _locationsRepository;
        private readonly IMapper _mapper;

        public GetAllLocationsService(ILocationsRepository locationsRepository
            , IMapper mapper)
        {
            _locationsRepository = locationsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LocationsDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _locationsRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<LocationsDto>>(entities);
        }
    }
}
