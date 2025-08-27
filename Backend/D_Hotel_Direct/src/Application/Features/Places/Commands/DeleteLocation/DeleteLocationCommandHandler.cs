using Application.Features.Places.Interfaces.Services.Command.DeleteLocation;
using MediatR;

namespace Application.Features.Places.Commands.DeleteLocation
{
    public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand, Unit>
    {
        private readonly IDeleteLocationService _deleteLocationService;

        public DeleteLocationCommandHandler(IDeleteLocationService deleteLocationService)
        {
            _deleteLocationService = deleteLocationService;
        }

        public Task<Unit> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
        {
            _deleteLocationService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Task;
        }
    }
}
