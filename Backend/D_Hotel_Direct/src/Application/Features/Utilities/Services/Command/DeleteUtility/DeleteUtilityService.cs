using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.DeleteUtility
{
    public class DeleteUtilityService : IDeleteUtilityService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteUtilityService(IUtilityRepository utilityRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _utilityRepository = utilityRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(UtilityDto utility, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<Utility>(utility);
            _utilityRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}