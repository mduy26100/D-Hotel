using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.CreateTravelPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using TravelPurposeEntity = Domain.Models.Purposes.TravelPurpose;

namespace Application.Features.Purposes.Services.Command.TravelPurpose.CreateTravelPurpose
{
    public class CreateTravelPurposeService : ICreateTravelPurposeService
    {
        private readonly ITravelPurposeRepository _travelPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateTravelPurposeService(ITravelPurposeRepository travelPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _travelPurposeRepository = travelPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<TravelPurposeDto> CreateAsync(TravelPurposeDto travelPurpose, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<TravelPurposeEntity>(travelPurpose);
            await _travelPurposeRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync();
            return _mapper.Map<TravelPurposeDto>(entity);
        }
    }
}
