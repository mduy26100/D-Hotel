namespace WebAPI.DependencyInjection.Shared
{
    public static class SharedServiceRegistration
    {
        public static IServiceCollection AddSharedServices(this IServiceCollection services)
        {
            //Logging
            services.AddScoped(typeof(ILoggingService<>), typeof(LoggingService<>));


            //Add MediatR
            services.AddMediatR(typeof(LoginCommandHandler).Assembly);

            //Add FluentValidation
            services.AddValidatorsFromAssemblyContaining<ChangePasswordCommandValidator>();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }
    }
}
