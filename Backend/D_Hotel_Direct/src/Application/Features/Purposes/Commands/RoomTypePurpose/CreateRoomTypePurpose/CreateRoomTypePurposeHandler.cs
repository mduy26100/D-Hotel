using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.CreateRoomTypePurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomTypePurpose.CreateRoomTypePurpose
{
    public class CreateRoomTypePurposeHandler : IRequestHandler<CreateRoomTypePurposeCommand, RoomTypePurposeDto>
    {
        private readonly ICreateRoomTypePurposeService _createRoomTypePurposeService;

        public CreateRoomTypePurposeHandler(ICreateRoomTypePurposeService createRoomTypePurposeService)
        {
            _createRoomTypePurposeService = createRoomTypePurposeService;
        }

        public async Task<RoomTypePurposeDto> Handle(CreateRoomTypePurposeCommand request, CancellationToken cancellationToken)
        {
            var result = await _createRoomTypePurposeService.CreateAsync(request.roomTypePurposeDto, cancellationToken);
            return result;
        }
    }
}
