using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateHotelUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateHotelUtility
{
    public class CreateHotelUtilityCommandHandler : IRequestHandler<CreateHotelUtilityCommand, HotelUtilityDto>
    {
        private readonly ICreateHotelUtilityService _createHotelUtilityService;

        public CreateHotelUtilityCommandHandler(ICreateHotelUtilityService createHotelUtilityService)
        {
            _createHotelUtilityService = createHotelUtilityService;
        }

        public async Task<HotelUtilityDto> Handle(CreateHotelUtilityCommand request, CancellationToken cancellationToken)
        {
            var parsedUtilityIds = request.utilityId
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(id => int.TryParse(id.Trim(), out var val) ? val : throw new FormatException("Invalid utility ID"))
                .Distinct()
                .ToList();

            var dto = new HotelUtilityDto
            {
                HotelId = request.hotelId,
                UtilityIds = parsedUtilityIds
            };

            return await _createHotelUtilityService.CreateAsync(dto, cancellationToken);
        }
    }
}
