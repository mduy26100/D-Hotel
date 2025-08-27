using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.Register;
using Application.Features.Auth.Services.Command.Register.Factory;

namespace Infrastructure.Auth.Services.Command.Register
{
    public class RegisterService : IRegisterService
    {
        private readonly IRegisterStrategyFactory _factory;

        public RegisterService(IRegisterStrategyFactory factory)
        {
            _factory = factory;
        }

        public async Task RegisterAsync(RegisterRequestDto dto, CancellationToken cancellationToken = default)
        {
            var strategy = _factory.GetStrategy(dto.Provider);
            await strategy.RegisterAsync(dto, cancellationToken);
        }
    }
}
