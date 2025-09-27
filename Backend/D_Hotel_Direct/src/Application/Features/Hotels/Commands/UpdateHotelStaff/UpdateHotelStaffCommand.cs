using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotelStaff
{
    public record UpdateHotelStaffCommand(HotelStaffDto hotelStaffDto) : IRequest
    {
    }
}
