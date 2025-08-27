using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityById;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityById
{
    public class GetUtilityByIdService : IGetUtilityByIdService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IMapper _mapper;

        public GetUtilityByIdService(IUtilityRepository utilityRepository
            , IMapper mapper)
        {
            _utilityRepository = utilityRepository;
            _mapper = mapper;
        }

        public async Task<UtilityDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var utility = await _utilityRepository.GetWithItemsByIdAsync(id, cancellationToken);
            return _mapper.Map<UtilityDto>(utility);
        }
    }
}