using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.BedType.CreateBedType
{
    public record CreateBedTypeCommand(BedTypeDto dto) : IRequest<BedTypeDto>
    {
    }
}
