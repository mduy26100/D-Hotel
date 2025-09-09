using Application.Features.Shared.DTOs;
using MediatR;

namespace Application.Features.Shared.Queries.GetHotelDetail
{
    public record GetHotelDetailQuery(int Id) : IRequest<HotelDetailDto?>;
}
