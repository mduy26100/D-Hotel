using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelStaff;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotelStaff
{
    public class CreateHotelStaffCommandHandler : IRequestHandler<CreateHotelStaffCommand, HotelStaffDto>
    {
        private readonly ICreateHotelStaffService _createHotelStaffService;

        public CreateHotelStaffCommandHandler(ICreateHotelStaffService createHotelStaffService)
        {
            _createHotelStaffService = createHotelStaffService;
        }

        public async Task<HotelStaffDto> Handle(CreateHotelStaffCommand request, CancellationToken cancellationToken)
        {
            return await _createHotelStaffService.CreateAsync(request.hotelStaffDto, cancellationToken);
        }
    }
}
