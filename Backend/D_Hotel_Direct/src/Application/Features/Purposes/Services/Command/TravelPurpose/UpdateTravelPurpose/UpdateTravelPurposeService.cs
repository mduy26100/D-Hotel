using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.UpdateTravelPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using TravelPurposeEntity = Domain.Models.Purposes.TravelPurpose;

namespace Application.Features.Purposes.Services.Command.TravelPurpose.UpdateTravelPurpose
{
    public class UpdateTravelPurposeService : IUpdateTravelPurposeService
    {
        private readonly ITravelPurposeRepository _travelPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateTravelPurposeService(ITravelPurposeRepository travelPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _travelPurposeRepository = travelPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(TravelPurposeDto travelPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<TravelPurposeEntity>(travelPurposeDto);
            _travelPurposeRepository.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
