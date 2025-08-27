using Application.Features.Utilities.Interfaces.Services.Command.DeleteUtilityItem;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteUtilityItem
{
    public class DeleteUtilityItemCommandHandler : IRequestHandler<DeleteUtilityItemCommand, Unit>
    {
        private readonly IDeleteUtilityItemService _deleteUtilityItemService;

        public DeleteUtilityItemCommandHandler(IDeleteUtilityItemService deleteUtilityItemService)
        {
            _deleteUtilityItemService = deleteUtilityItemService;
        }

        public Task<Unit> Handle(DeleteUtilityItemCommand request, CancellationToken cancellationToken)
        {
            _deleteUtilityItemService.DeleteAsync(request.Dto, cancellationToken);
            return Unit.Task;
        }
    }
}
