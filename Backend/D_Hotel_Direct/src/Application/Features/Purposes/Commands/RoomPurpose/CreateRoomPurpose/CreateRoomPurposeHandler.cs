using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.CreateRoomPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomPurpose.CreateRoomPurpose
{
    public class CreateRoomPurposeHandler : IRequestHandler<CreateRoomPurposeCommand, RoomPurposeDto>
    {
        private readonly ICreateRoomPurposeService _createRoomPurposeService;

        public CreateRoomPurposeHandler(ICreateRoomPurposeService createRoomPurposeService)
        {
            _createRoomPurposeService = createRoomPurposeService;
        }

        public async Task<RoomPurposeDto> Handle(CreateRoomPurposeCommand request, CancellationToken cancellationToken)
        {
            var reuslt = await _createRoomPurposeService.CreateAsync(request.roomPurposeDto, cancellationToken);
            return reuslt;
        }
    }
}
