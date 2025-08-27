using Application.Features.Auth.DTOs;

namespace Application.Features.Auth.Services.Command.UpdateProfile.Strategy
{
    public interface IUpdateProfileStrategy
    {
        Task UpdateAsync(UpdateProfileDto dto, CancellationToken cancellationToken = default);
    }
}
