using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.CreateHotelTravelPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.HotelTravelPurpose.CreateHotelTravelPurpose
{
    public class CreateHotelTravelPurposeHandler : IRequestHandler<CreateHotelTravelPurposeCommand, HotelTravelPurposeDto>
    {
        private readonly ICreateHotelTravelPurposeService _createHotelTravelPurposeService;

        public CreateHotelTravelPurposeHandler(ICreateHotelTravelPurposeService createHotelTravelPurposeService)
        {
            _createHotelTravelPurposeService = createHotelTravelPurposeService;
        }

        public async Task<HotelTravelPurposeDto> Handle(CreateHotelTravelPurposeCommand request, CancellationToken cancellationToken)
        {
            var result = await _createHotelTravelPurposeService.CreateAsync(request.hotelTravelPurposeDto, cancellationToken);
            return result;
        }
    }
}
