using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotelStaff
{
    public record CreateHotelStaffCommand(HotelStaffDto hotelStaffDto) : IRequest<HotelStaffDto>
    {
    }
}
