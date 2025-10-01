using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetBedTypeById;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.BedType.GetBedTypeById
{
    public class GetBedTypeByIdService : IGetBedTypeByIdService
    {
        private readonly IBedTypeRepository _bedTypeRepository;
        private readonly IMapper _mapper;

        public GetBedTypeByIdService(IBedTypeRepository bedTypeRepository
            , IMapper mapper)
        {
            _bedTypeRepository = bedTypeRepository;
            _mapper = mapper;
        }

        public async Task<BedTypeDto> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var bedType = await _bedTypeRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<BedTypeDto>(bedType);
        }
    }
}
