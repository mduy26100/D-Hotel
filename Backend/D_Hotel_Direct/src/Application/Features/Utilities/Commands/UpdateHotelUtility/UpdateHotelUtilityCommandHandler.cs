using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateHotelUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateHotelUtility
{
    public class UpdateHotelUtilityCommandHandler : IRequestHandler<UpdateHotelUtilityCommand, Unit>
    {
        private readonly IUpdateHotelUtilityService _updateHotelUtilityService;

        public UpdateHotelUtilityCommandHandler(IUpdateHotelUtilityService updateHotelUtilityService)
        {
            _updateHotelUtilityService = updateHotelUtilityService;
        }

        public async Task<Unit> Handle(UpdateHotelUtilityCommand request, CancellationToken cancellationToken)
        {
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

            await _updateHotelUtilityService.UpdateAsync(dto, cancellationToken);

            return Unit.Value;
        }
    }
}
