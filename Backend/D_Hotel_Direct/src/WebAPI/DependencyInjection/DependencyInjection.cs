using WebAPI.DependencyInjection.Auth;
using WebAPI.DependencyInjection.Common;
using WebAPI.DependencyInjection.Features;
using WebAPI.DependencyInjection.Infrastructure;
using WebAPI.DependencyInjection.Shared;

namespace WebAPI.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services
            , IConfiguration configuration)
        {
            //Infrastructure
            services.AddDatabaseServices(configuration);
            services.AddCacheServices(configuration);
            services.AddFileUploadServices(configuration);
            services.AddMappingServices();

            //Auth
            services.AddAuthService(configuration);

            // Features
            services.AddHotelServices();
            services.AddUtilityServices();
            services.AddPlaceServices();
            services.AddPurposeService();
            services.AddRoomService();

            //Shared
            services.AddSharedServices();

            //Common
            services.AddCorsPolicies();

            return services;
        }
    }
}
