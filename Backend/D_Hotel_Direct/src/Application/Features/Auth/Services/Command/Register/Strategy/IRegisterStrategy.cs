using Application.Features.Auth.DTOs;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Register.Strategy
{
    public interface IRegisterStrategy
    {
        RegisterProvider Provider { get; }
        Task RegisterAsync(RegisterRequestDto dto, CancellationToken cancellationToken = default);
    }
}
