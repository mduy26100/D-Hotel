using Application.Features.Utilities.Interfaces.Services.Command.DeleteUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteUtility
{
    public class DeleteUtilityCommandHandler : IRequestHandler<DeleteUtilityCommand, Unit>
    {
        private readonly IDeleteUtilityService _deleteUtilityService;

        public DeleteUtilityCommandHandler(IDeleteUtilityService deleteUtilityService)
        {
            _deleteUtilityService = deleteUtilityService;
        }

        public Task<Unit> Handle(DeleteUtilityCommand request, CancellationToken cancellationToken)
        {
            _deleteUtilityService.DeleteAsync(request.Dto, cancellationToken);
            return Unit.Task;
        }
    }
}
