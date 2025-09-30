using Application.Features.Hotels.Mappings;
using Application.Features.Places.Mappings;
using Application.Features.Purposes.Mappings;

namespace WebAPI.DependencyInjection.Infrastructure
{
    public static class MappingServiceRegistration
    {
        public static IServiceCollection AddMappingServices(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<UtilityMappingProfile>();
                cfg.AddProfile<HotelMappingProfile>();
                cfg.AddProfile<PlaceMappingProfile>();
                cfg.AddProfile<PurposeMappingProfile>();
            });

            return services;
        }
    }
}
