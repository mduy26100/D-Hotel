using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.UpdateRoomUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.UpdateRoomUtility
{
    public class UpdateRoomUtilityHandler : IRequestHandler<UpdateRoomUtilityCommand, Unit>
    {
        private readonly IUpdateRoomUtilityService _updateRoomUtilityService;

        public UpdateRoomUtilityHandler(IUpdateRoomUtilityService updateRoomUtilityService)
        {
            _updateRoomUtilityService = updateRoomUtilityService;
        }

        public async Task<Unit> Handle(UpdateRoomUtilityCommand request, CancellationToken cancellationToken)
        {
            var parsedUtilityIds = request.utilityIds
                        .Split(',', StringSplitOptions.RemoveEmptyEntries)
                        .Select(id => int.TryParse(id.Trim(), out var val) ? val : throw new FormatException("Invalid utility ID"))
                        .Distinct()
                        .ToList();

            var dto = new RoomUtilityDto
            {
                RoomId = request.roomId,
                UtilityIds = parsedUtilityIds
            };

            await _updateRoomUtilityService.UpdateAsync(dto, cancellationToken);

            return Unit.Value;
        }
    }
}
