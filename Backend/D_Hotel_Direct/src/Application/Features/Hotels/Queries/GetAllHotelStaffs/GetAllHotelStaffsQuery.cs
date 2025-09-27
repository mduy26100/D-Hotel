using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotelStaffs
{
    public record GetAllHotelStaffsQuery() : IRequest<IEnumerable<HotelStaffDto>>
    {
    }
}
