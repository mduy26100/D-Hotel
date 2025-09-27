using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelStaff;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotelStaff
{
    public class DeleteHotelStaffCommandHandler : IRequestHandler<DeleteHotelStaffCommand, Unit>
    {
        private readonly IDeleteHotelStaffService _deleteHotelStaffService;

        public DeleteHotelStaffCommandHandler(IDeleteHotelStaffService deleteHotelStaffService)
        {
            _deleteHotelStaffService = deleteHotelStaffService;
        }

        public async Task<Unit> Handle(DeleteHotelStaffCommand request, CancellationToken cancellationToken)
        {
            await _deleteHotelStaffService.DeleteAsync(request.hotelStaffDto, cancellationToken);
            return Unit.Value;
        }
    }
}
