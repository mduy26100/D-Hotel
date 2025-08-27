using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotel;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotel
{
    public class DeleteHotelCommandHandler : IRequestHandler<DeleteHotelCommand, Unit>
    {
        private readonly IDeleteHotelService _deleteHotelService;

        public DeleteHotelCommandHandler(IDeleteHotelService deleteHotelService)
        {
            _deleteHotelService = deleteHotelService;
        }

        public Task<Unit> Handle(DeleteHotelCommand request, CancellationToken cancellationToken)
        {
            _deleteHotelService.DeleteAsync(request.Dto, cancellationToken);
            return Unit.Task;
        }
    }
}
