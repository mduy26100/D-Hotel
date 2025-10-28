using Application.Common.Interfaces.Services.AI;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Text.Json;

namespace Infrastructure.Services.AI
{
    public class OpenAIService : IOpenAIService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public OpenAIService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> AskChatAsync(string prompt)
        {
            var apiKey = _configuration["OpenRouter:ApiKey"];

            var messages = new[]
            {
                new { role = "system", content = "Bạn là trợ lý AI cho D Hotel Booking, trả lời nhanh, ngắn gọn, thân thiện. KHÔNG trả về suy nghĩ hay hướng dẫn nội bộ." },
                new { role = "user", content = prompt }
            };

            var request = new
            {
                model = "minimax/minimax-m2:free",
                messages = messages
            };

            var requestContent = new StringContent(
                JsonSerializer.Serialize(request),
                Encoding.UTF8,
                "application/json"
            );

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
            _httpClient.DefaultRequestHeaders.Add("HTTP-Referer", "https://yourdomain.com");
            _httpClient.DefaultRequestHeaders.Add("X-Title", "ToDo-AI");

            var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", requestContent);
            var responseString = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                throw new Exception($"OpenRouter Error: {response.StatusCode} - {responseString}");

            using var doc = JsonDocument.Parse(responseString);
            var result = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return result ?? "No response.";
        }
    }
}
