using Application.Features.Utilities.Interfaces.Services.Command.UpdateUtilityItem;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateUtilityItem
{
    public class UpdateUtilityItemCommandHandler : IRequestHandler<UpdateUtilityItemCommand, Unit>
    {
        private readonly IUpdateUtilityItemService _updateUtilityItemService;

        public UpdateUtilityItemCommandHandler(IUpdateUtilityItemService updateUtilityItemService)
        {
            _updateUtilityItemService = updateUtilityItemService;
        }

        public Task<Unit> Handle(UpdateUtilityItemCommand request, CancellationToken cancellationToken)
        {
            _updateUtilityItemService.UpdateAsync(request.Dto, cancellationToken);
            return Unit.Task;
        }
    }
}
