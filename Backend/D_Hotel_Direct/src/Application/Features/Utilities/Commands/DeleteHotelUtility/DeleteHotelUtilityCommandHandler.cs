using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteHotelUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteHotelUtility
{
    public class DeleteHotelUtilityCommandHandler : IRequestHandler<DeleteHotelUtilityCommand, Unit>
    {
        private readonly IDeleteHotelUtilityService _deleteHotelUtilityService;

        public DeleteHotelUtilityCommandHandler(IDeleteHotelUtilityService deleteHotelUtilityService)
        {
            _deleteHotelUtilityService = deleteHotelUtilityService;
        }

        public async Task<Unit> Handle(DeleteHotelUtilityCommand request, CancellationToken cancellationToken)
        {
            // Parse chuỗi "1,2,3" thành List<int>
            var parsedUtilityIds = request.utilityIds
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(id => int.TryParse(id.Trim(), out var val) ? val : throw new FormatException("Invalid utility ID"))
                .Distinct()
                .ToList();

            var dto = new HotelUtilityDto
            {
                HotelId = request.hotelId,
                UtilityIds = parsedUtilityIds
            };

            await _deleteHotelUtilityService.DeleteAsync(dto, cancellationToken);

            return Unit.Value;
        }
    }
}
