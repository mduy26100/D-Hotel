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
            var parsedUtilityIds = request.utilityId
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(id => int.TryParse(id.Trim(), out var val) ? val : throw new FormatException("Invalid utility ID"))
                .Distinct()
                .ToList();

            var dto = new RoomUtilityDto
            {
                RoomId = request.roomId,
                UtilityIds = parsedUtilityIds
            };

            var result = await _createRoomUtilityService.CreateAsync(dto, cancellationToken);

            return result;
        }
    }
}
