using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.DeleteRoomUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.DeleteRoomUtitlity
{
    public class DeleteRoomUtitlityHandler : IRequestHandler<DeleteRoomUtitlityCommand, Unit>
    {
        private readonly IDeleteRoomUtilityService _deleteRoomUtilityService;

        public DeleteRoomUtitlityHandler(IDeleteRoomUtilityService deleteRoomUtilityService)
        {
            _deleteRoomUtilityService = deleteRoomUtilityService;
        }

        public async Task<Unit> Handle(DeleteRoomUtitlityCommand request, CancellationToken cancellationToken)
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

            await _deleteRoomUtilityService.DeleteAsync(dto, cancellationToken);
            return Unit.Value;
        }
    }
}
