using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateUtilityItem;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateUtilityItem
{
    public class CreateUtilityItemCommandHandler : IRequestHandler<CreateUtilityItemCommand, UtilityItemDto>
    {
        private readonly ICreateUtilityItemService _createUtilityItemService;

        public CreateUtilityItemCommandHandler(ICreateUtilityItemService createUtilityItemService)
        {
            _createUtilityItemService = createUtilityItemService;
        }

        public async Task<UtilityItemDto> Handle(CreateUtilityItemCommand request, CancellationToken cancellationToken)
        {
            return await _createUtilityItemService.CreateAsync(request.Dto, cancellationToken);
        }
    }
}
