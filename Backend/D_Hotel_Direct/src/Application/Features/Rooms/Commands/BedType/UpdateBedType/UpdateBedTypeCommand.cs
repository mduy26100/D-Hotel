using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.BedType.UpdateBedType
{
    public record UpdateBedTypeCommand(BedTypeDto dto) : IRequest
    {
    }
}
