using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelStaff;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotelStaff
{
    public class UpdateHotelStaffCommandHandler : IRequestHandler<UpdateHotelStaffCommand, Unit>
    {
        private readonly IUpdateHotelStaffService _updateHotelStaffService;

        public UpdateHotelStaffCommandHandler(IUpdateHotelStaffService updateHotelStaffService)
        {
            _updateHotelStaffService = updateHotelStaffService;
        }

        public async Task<Unit> Handle(UpdateHotelStaffCommand request, CancellationToken cancellationToken)
        {
            await _updateHotelStaffService.UpdateAsync(request.hotelStaffDto, cancellationToken);
            return Unit.Value;
        }
    }
}
