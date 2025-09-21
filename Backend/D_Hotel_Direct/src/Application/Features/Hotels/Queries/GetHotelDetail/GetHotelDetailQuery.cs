using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelDetail
{
    public record GetHotelDetailQuery(int Id) : IRequest<HotelDetailDto?>;
}
