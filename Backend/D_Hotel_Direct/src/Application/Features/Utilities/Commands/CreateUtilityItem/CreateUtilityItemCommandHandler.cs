using Application.Features.Utilities.DTOs;
using MediatR;
using AutoMapper;
using Application.Features.Utilities.Repositories;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Commands.CreateUtilityItem
{
    public class CreateUtilityItemCommandHandler : IRequestHandler<CreateUtilityItemCommand, UtilityItemDto>
    {
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateUtilityItemCommandHandler(IUtilityItemRepository utilityItemRepository
            , IApplicationDbContext context
            , IMapper mapper)
        {
            _utilityItemRepository = utilityItemRepository;
            _context = context;
            _mapper = mapper;
        }

        public async Task<UtilityItemDto> Handle(CreateUtilityItemCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var entity = _mapper.Map<UtilityItem>(request.Dto);
                await _utilityItemRepository.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return _mapper.Map<UtilityItemDto>(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error creating UtilityItem: {ex.Message}", ex);
                throw;
            }
        }
    }
}