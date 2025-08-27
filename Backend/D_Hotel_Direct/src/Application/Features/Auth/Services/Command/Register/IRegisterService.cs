using Application.Features.Auth.DTOs;

namespace Application.Features.Auth.Services.Command.Register
{
    public interface IRegisterService
    {
        Task RegisterAsync(RegisterRequestDto dto, CancellationToken cancellationToken = default);
    }
}
