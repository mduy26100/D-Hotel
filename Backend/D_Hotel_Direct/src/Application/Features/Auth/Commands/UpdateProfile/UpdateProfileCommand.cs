using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.UpdateProfile
{
    public record UpdateProfileCommand(UpdateProfileDto Dto) : IRequest;
}
