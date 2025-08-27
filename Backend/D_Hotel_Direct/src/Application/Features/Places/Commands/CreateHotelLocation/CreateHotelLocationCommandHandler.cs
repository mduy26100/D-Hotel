using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.CreateHotelLocation;
using MediatR;

namespace Application.Features.Places.Commands.CreateHotelLocation
{
    public class CreateHotelLocationCommandHandler : IRequestHandler<CreateHotelLocationCommand, HotelLocationsDto>
    {
        private readonly ICreateHotelLocationService _createHotelLocationService;

        public CreateHotelLocationCommandHandler(ICreateHotelLocationService createHotelLocationService)
        {
            _createHotelLocationService = createHotelLocationService;
        }

        public async Task<HotelLocationsDto> Handle(CreateHotelLocationCommand request, CancellationToken cancellationToken)
        {
            return await _createHotelLocationService.CreateAsync(request.dto, cancellationToken);
        }
    }
}
