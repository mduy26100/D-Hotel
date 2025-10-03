using Application.Features.Bookings.Mappings;
using Application.Features.Hotels.Mappings;
using Application.Features.Places.Mappings;
using Application.Features.Purposes.Mappings;
using Application.Features.Rooms.Mappings;

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
                cfg.AddProfile<RoomMappingProfile>();
                cfg.AddProfile<BookingMappingProfile>();
            });

            return services;
        }
    }
}
