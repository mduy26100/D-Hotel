using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Command.DeleteLocation
{
    public interface IDeleteLocationService
    {
        Task DeleteAsync(LocationsDto locationsDto, CancellationToken cancellationToken = default);
    }
}
