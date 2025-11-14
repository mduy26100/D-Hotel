namespace Application.Features.Assistants.Interfaces
{
    public interface IPromptService
    {
        bool Cancel(string prompt, Guid? accountId, CancellationToken cancellationToken = default);
        Task<string> AskAsync(string prompt, Guid? accountId, CancellationToken cancellationToken = default);
    }
}
