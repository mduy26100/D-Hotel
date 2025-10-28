namespace Application.Common.Interfaces.Services.AI
{
    public interface IOpenAIService
    {
        Task<string> AskChatAsync(string prompt);
    }
}
