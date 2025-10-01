using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetAllBedTypes;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.BedType.GetAllBedTypes
{
    public class GetAllBedTypesService : IGetAllBedTypesService
    {
        private readonly IBedTypeRepository _bedTypeRepository;
        private readonly IMapper _mapper;

        public GetAllBedTypesService(IBedTypeRepository bedTypeRepository
            , IMapper mapper)
        {
            _bedTypeRepository = bedTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BedTypeDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _bedTypeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<BedTypeDto>>(list);
        }
    }
}
