using Application.Features.Places.Interfaces.Services.Command.DeleteHotelLocation;
using MediatR;

namespace Application.Features.Places.Commands.DeleteHotelLocation
{
    public class DeleteHotelLocationCommandHandler : IRequestHandler<DeleteHotelLocationCommand, Unit>
    {
        private readonly IDeleteHotelLocationService _deleteHotelLocationService;

        public DeleteHotelLocationCommandHandler(IDeleteHotelLocationService deleteHotelLocationService)
        {
            _deleteHotelLocationService = deleteHotelLocationService;
        }

        public Task<Unit> Handle(DeleteHotelLocationCommand request, CancellationToken cancellationToken)
        {
            _deleteHotelLocationService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Task;
        }
    }
}
