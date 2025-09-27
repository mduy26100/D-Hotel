using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelStaffById
{
    public record GetHotelStaffByIdQuery(int id) : IRequest<HotelStaffDto>
    {
    }
}
