using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.CreateRoomUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.CreateRoomUtility
{
    public class CreateRoomUtilityHandler : IRequestHandler<CreateRoomUtilityCommand, RoomUtilityDto>
    {
        private readonly ICreateRoomUtilityService _createRoomUtilityService;

        public CreateRoomUtilityHandler(ICreateRoomUtilityService createRoomUtilityService)
        {
            _createRoomUtilityService = createRoomUtilityService;
        }
        public async Task<RoomUtilityDto> Handle(CreateRoomUtilityCommand request, CancellationToken cancellationToken)
        {
            return await _createRoomUtilityService.CreateAsync(request.roomUtilityDto, cancellationToken);
        }
    }
}
