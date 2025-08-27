using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.ChangePassword
{
    public record ChangePasswordCommand(ChangePasswordDto Dto) : IRequest;
}
