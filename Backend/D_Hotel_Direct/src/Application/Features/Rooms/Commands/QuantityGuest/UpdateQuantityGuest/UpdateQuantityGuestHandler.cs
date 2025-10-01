using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.UpdateQuantityGuest;
using MediatR;

namespace Application.Features.Rooms.Commands.QuantityGuest.UpdateQuantityGuest
{
    public class UpdateQuantityGuestHandler : IRequestHandler<UpdateQuantityGuestCommand, Unit>
    {
        private readonly IUpdateQuantityGuestService _updateQuantityGuestService;

        public UpdateQuantityGuestHandler(IUpdateQuantityGuestService updateQuantityGuestService)
        {
            _updateQuantityGuestService = updateQuantityGuestService;
        }

        public async Task<Unit> Handle(UpdateQuantityGuestCommand request, CancellationToken cancellationToken)
        {
            await _updateQuantityGuestService.UpdateAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
