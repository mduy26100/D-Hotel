using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.BedType.DeleteBedType
{
    public record DeleteBedTypeCommand(BedTypeDto dto) : IRequest
    {
    }
}
