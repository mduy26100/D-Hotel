using Application.Common.Interfaces.Services.AI;
using Application.Common.Interfaces.Services.Email;
using Application.Features.Assistants.Interfaces;
using Application.Features.Assistants.Services.GuestPromt;
using Infrastructure.Services.AI;
using Infrastructure.Services.Email;
using WebAPI.DependencyInjection;
using WebAPI.Hubs;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
// Configure CORS to allow only the specified frontend origins from appsettings
var allowedDomains = builder.Configuration.GetSection("AllowedDomains").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy =>
        {
            if (allowedDomains != null && allowedDomains.Length > 0)
            {
                policy.WithOrigins(allowedDomains)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }
        });
});

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient();

builder.Services.AddSignalR();

// Add services
builder.Services.AddApplicationServices(builder.Configuration);

//Send Email
builder.Services.AddScoped<IEmailService, ResendEmailService>();

//HTTP_ChatBot
builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient<IOpenAIService, OpenAIService>();
builder.Services.AddScoped<IPromtService, GuestPromtService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthorization();

app.MapControllers();

//Hubs
app.MapHub<BookingHub>("/hubs/bookings");


//Data Seed
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedIdentityData.SeedAsync(services);
}

app.Run();
