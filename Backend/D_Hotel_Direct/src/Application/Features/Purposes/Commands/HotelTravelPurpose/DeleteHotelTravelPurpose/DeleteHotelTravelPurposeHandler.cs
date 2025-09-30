using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.DeleteHotelTravelPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.HotelTravelPurpose.DeleteHotelTravelPurpose
{
    public class DeleteHotelTravelPurposeHandler : IRequestHandler<DeleteHotelTravelPurposeCommand, Unit>
    {
        private readonly IDeleteHotelTravelPurposeService _deleteHotelTravelPurposeService;

        public DeleteHotelTravelPurposeHandler(IDeleteHotelTravelPurposeService deleteHotelTravelPurposeService)
        {
            _deleteHotelTravelPurposeService = deleteHotelTravelPurposeService;
        }

        public async Task<Unit> Handle(DeleteHotelTravelPurposeCommand request, CancellationToken cancellationToken)
        {
            await _deleteHotelTravelPurposeService.DeleteAsync(request.hotelTravelPurposeDto, cancellationToken);
            return Unit.Value;
        }
    }
}
