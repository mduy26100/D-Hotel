using Application.Common.Interfaces.Services.Email;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Infrastructure.Services.Email
{
    public class ResendEmailService : IEmailService
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;

        public ResendEmailService(IConfiguration configuration)
        {
            _apiKey = configuration["Resend:ApiKey"]
                ?? throw new InvalidOperationException("Missing Resend API key in configuration.");

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://api.resend.com/")
            };

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _apiKey);
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlContent)
        {
            if (string.IsNullOrWhiteSpace(toEmail))
                throw new ArgumentException("Recipient email cannot be empty.", nameof(toEmail));

            var payload = new
            {
                from = "D Hotel <onboarding@resend.dev>",
                to = new[] { toEmail },
                subject,
                html = htmlContent
            };

            var json = JsonSerializer.Serialize(payload);
            using var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("emails", content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"[Resend Error] {error}");
            }
        }
    }
}
