using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Command.UpdateLocation
{
    public interface IUpdateLocationService
    {
        Task UpdateAsync(UpsertLocationRequest request, CancellationToken cancellationToken = default);
    }
}
