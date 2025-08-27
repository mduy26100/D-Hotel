using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateUtilityItem;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.CreateUtilityItem
{
    public class CreateUtilityItemService : ICreateUtilityItemService
    {
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateUtilityItemService(IUtilityItemRepository utilityItemRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<UtilityItemDto> CreateAsync(UtilityItemDto utilityItem, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<UtilityItem>(utilityItem);
            await _utilityItemRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<UtilityItemDto>(entity);
        }
    }
}