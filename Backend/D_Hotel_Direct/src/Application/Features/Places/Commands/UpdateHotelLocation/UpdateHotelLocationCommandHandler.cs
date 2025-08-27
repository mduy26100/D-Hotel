using Application.Features.Places.Interfaces.Services.Command.UpdateHotelLocation;
using MediatR;

namespace Application.Features.Places.Commands.UpdateHotelLocation
{
    public class UpdateHotelLocationCommandHandler : IRequestHandler<UpdateHotelLocationCommand, Unit>
    {
        private readonly IUpdateHotelLocationService _updateHotelLocationService;

        public UpdateHotelLocationCommandHandler(IUpdateHotelLocationService updateHotelLocationService)
        {
            _updateHotelLocationService = updateHotelLocationService;
        }

        public Task<Unit> Handle(UpdateHotelLocationCommand request, CancellationToken cancellationToken)
        {
            _updateHotelLocationService.UpdateAsync(request.dto, cancellationToken);
            return Unit.Task;
        }
    }
}
