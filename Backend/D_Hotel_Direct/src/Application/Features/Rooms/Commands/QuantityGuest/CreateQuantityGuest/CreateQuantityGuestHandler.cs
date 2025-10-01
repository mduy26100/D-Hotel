using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.CreateQuantityGuest;
using MediatR;

namespace Application.Features.Rooms.Commands.QuantityGuest.CreateQuantityGuest
{
    public class CreateQuantityGuestHandler : IRequestHandler<CreateQuantityGuestCommand, QuantityGuestDto>
    {
        private readonly ICreateQuantityGuestService _createQuantityGuestService;

        public CreateQuantityGuestHandler(ICreateQuantityGuestService createQuantityGuestService)
        {
            _createQuantityGuestService = createQuantityGuestService;
        }

        public async Task<QuantityGuestDto> Handle(CreateQuantityGuestCommand request, CancellationToken cancellationToken)
        {
            return await _createQuantityGuestService.CreateAsync(request.dto, cancellationToken);
        }
    }
}
