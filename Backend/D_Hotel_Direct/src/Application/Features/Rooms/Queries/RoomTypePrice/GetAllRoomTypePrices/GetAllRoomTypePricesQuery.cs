using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomTypePrice.GetAllRoomTypePrices
{
    public record GetAllRoomTypePricesQuery : IRequest<IEnumerable<RoomTypePriceDto>>
    {
    }
}
