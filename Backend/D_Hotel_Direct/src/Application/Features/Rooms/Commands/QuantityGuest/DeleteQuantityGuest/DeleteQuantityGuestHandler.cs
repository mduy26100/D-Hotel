using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.DeleteQuantityGuest;
using MediatR;

namespace Application.Features.Rooms.Commands.QuantityGuest.DeleteQuantityGuest
{
    public class DeleteQuantityGuestHandler : IRequestHandler<DeleteQuantityGuestCommand, Unit>
    {
        private readonly IDeleteQuantityGuestService _deleteQuantityGuestService;

        public DeleteQuantityGuestHandler(IDeleteQuantityGuestService deleteQuantityGuestService)
        {
            _deleteQuantityGuestService = deleteQuantityGuestService;
        }

        public async Task<Unit> Handle(DeleteQuantityGuestCommand request, CancellationToken cancellationToken)
        {
            await _deleteQuantityGuestService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
