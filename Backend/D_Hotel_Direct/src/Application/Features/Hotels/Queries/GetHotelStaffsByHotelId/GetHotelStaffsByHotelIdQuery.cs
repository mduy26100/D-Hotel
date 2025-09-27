using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelStaffsByHotelId
{
    public record GetHotelStaffsByHotelIdQuery(int hotelId) : IRequest<IEnumerable<HotelStaffDto>>
    {
    }
}
