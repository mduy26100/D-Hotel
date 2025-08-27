using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteUtilityItem;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.DeleteUtilityItem
{
    public class DeleteUtilityItemService : IDeleteUtilityItemService
    {
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteUtilityItemService(IUtilityItemRepository utilityItemRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(UtilityItemDto utilityItem, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<UtilityItem>(utilityItem);
            _utilityItemRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}