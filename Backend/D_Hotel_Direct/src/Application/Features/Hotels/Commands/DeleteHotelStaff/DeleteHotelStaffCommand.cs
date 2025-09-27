using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotelStaff
{
    public record DeleteHotelStaffCommand(HotelStaffDto hotelStaffDto) : IRequest
    {
    }
}
