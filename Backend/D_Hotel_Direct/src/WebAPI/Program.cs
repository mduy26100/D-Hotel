using Application.Common.Interfaces.Services.AI;
using Application.Common.Interfaces.Services.Email;
using Application.Features.Assistants.Interfaces;
using Application.Features.Assistants.Services.GuestPromt;
using Infrastructure.Services.AI;
using Infrastructure.Services.Email;
using WebAPI.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

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

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthorization();

app.MapControllers();


//Data Seed
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await SeedIdentityData.SeedAsync(services);
}

app.Run();
