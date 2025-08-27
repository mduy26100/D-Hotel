using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateUtilityItem;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.UpdateUtilityItem
{
    public class UpdateUtilityItemService : IUpdateUtilityItemService
    {
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateUtilityItemService(IUtilityItemRepository utilityItemRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(UtilityItemDto utilityItem, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<UtilityItem>(utilityItem);
            _utilityItemRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}