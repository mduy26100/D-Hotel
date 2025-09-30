using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.DeleteTravelPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.TravelPurpose.DeleteTravelPurpose
{
    public class DeleteTravelPurposeHandler : IRequestHandler<DeleteTravelPurposeCommand, Unit>
    {
        private readonly IDeleteTravelPurposeService _deleteTravelPurposeService;

        public DeleteTravelPurposeHandler(IDeleteTravelPurposeService deleteTravelPurposeService)
        {
            _deleteTravelPurposeService = deleteTravelPurposeService;
        }

        public async Task<Unit> Handle(DeleteTravelPurposeCommand request, CancellationToken cancellationToken)
        {
            await _deleteTravelPurposeService.DeleteAsync(request.travelPurpose, cancellationToken);
            return Unit.Value;
        }
    }
}
