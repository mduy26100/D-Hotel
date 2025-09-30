using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.CreateTravelPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.TravelPurpose.CreateTravelPurpose
{
    public class CreateTravelPurposeHandler : IRequestHandler<CreateTravelPurposeCommand, TravelPurposeDto>
    {
        private readonly ICreateTravelPurposeService _createTravelPurposeService;

        public CreateTravelPurposeHandler(ICreateTravelPurposeService createTravelPurposeService)
        {
            _createTravelPurposeService = createTravelPurposeService;
        }

        public async Task<TravelPurposeDto> Handle(CreateTravelPurposeCommand request, CancellationToken cancellationToken)
        {
            var result = await _createTravelPurposeService.CreateAsync(request.travelPurpose, cancellationToken);
            return result;
        }
    }
}
