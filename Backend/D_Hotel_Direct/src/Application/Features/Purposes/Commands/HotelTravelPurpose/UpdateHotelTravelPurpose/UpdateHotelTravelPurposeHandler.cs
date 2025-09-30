using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.UpdateHotelTravelPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.HotelTravelPurpose.UpdateHotelTravelPurpose
{
    public class UpdateHotelTravelPurposeHandler : IRequestHandler<UpdateHotelTravelPurposeCommand, Unit>
    {
        private readonly IUpdateHotelTravelPurposeService _updateHotelTravelPurposeService;

        public UpdateHotelTravelPurposeHandler(IUpdateHotelTravelPurposeService updateHotelTravelPurposeService)
        {
            _updateHotelTravelPurposeService = updateHotelTravelPurposeService;
        }

        public async Task<Unit> Handle(UpdateHotelTravelPurposeCommand request, CancellationToken cancellationToken)
        {
            await _updateHotelTravelPurposeService.UpdateAsync(request.hotelTravelPurposeDto, cancellationToken);
            return Unit.Value;
        }
    }
}
