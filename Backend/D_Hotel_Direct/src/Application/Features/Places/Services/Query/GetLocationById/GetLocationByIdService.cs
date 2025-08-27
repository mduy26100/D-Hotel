using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using Application.Features.Places.Repositories;
using AutoMapper;

namespace Application.Features.Places.Services.Query.GetLocationById
{
    public class GetLocationByIdService : IGetLocationByIdService
    {
        private readonly ILocationsRepository _locationsRepository;
        private readonly IMapper _mapper;

        public GetLocationByIdService(ILocationsRepository locationsRepository
            , IMapper mapper)
        {
            _locationsRepository = locationsRepository;
            _mapper = mapper;
        }

        public async Task<LocationsDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _locationsRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<LocationsDto>(entity);
        }
    }
}
