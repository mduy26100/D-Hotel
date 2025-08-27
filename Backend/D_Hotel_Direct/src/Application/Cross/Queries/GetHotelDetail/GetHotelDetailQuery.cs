using Application.Cross.DTOs;
using MediatR;

namespace Application.Cross.Queries.GetHotelDetail
{
    public record GetHotelDetailQuery(int Id) : IRequest<HotelDetailDto?>;
}
