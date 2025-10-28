namespace Application.Features.Assistants.Interfaces
{
    public interface IPromtService
    {
        bool Cancel(string prompt, Guid? accountId, CancellationToken cancellationToken = default);
        Task<string> AskAsync(string prompt, Guid? accountId, CancellationToken cancellationToken = default);
    }
}
