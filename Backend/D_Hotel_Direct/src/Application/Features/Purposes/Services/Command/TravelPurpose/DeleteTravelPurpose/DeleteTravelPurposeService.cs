using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.DeleteTravelPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using TravelPurposeEntity = Domain.Models.Purposes.TravelPurpose;

namespace Application.Features.Purposes.Services.Command.TravelPurpose.DeleteTravelPurpose
{
    public class DeleteTravelPurposeService : IDeleteTravelPurposeService
    {
        private readonly ITravelPurposeRepository _travelPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteTravelPurposeService(ITravelPurposeRepository travelPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _travelPurposeRepository = travelPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(TravelPurposeDto travelPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<TravelPurposeEntity>(travelPurposeDto);
            _travelPurposeRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
