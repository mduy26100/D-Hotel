using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Commands.DeleteLocation
{
    public record DeleteLocationCommand(LocationsDto dto) : IRequest;
}
