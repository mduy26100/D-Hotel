using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.UpdateTravelPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.TravelPurpose.UpdateTravelPurpose
{
    public class UpdateTravelPurposeHandler : IRequestHandler<UpdateTravelPurposeCommand, Unit>
    {
        private readonly IUpdateTravelPurposeService _updateTravelPurposeService;

        public UpdateTravelPurposeHandler(IUpdateTravelPurposeService updateTravelPurposeService)
        {
            _updateTravelPurposeService = updateTravelPurposeService;
        }

        public async Task<Unit> Handle(UpdateTravelPurposeCommand request, CancellationToken cancellationToken)
        {
            await _updateTravelPurposeService.UpdateAsync(request.travelPurpose, cancellationToken);
            return Unit.Value;
        }
    }
}
