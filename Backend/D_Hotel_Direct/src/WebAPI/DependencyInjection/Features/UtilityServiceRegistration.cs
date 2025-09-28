using Application.Features.Utilities.Interfaces.Services.Command.CreateHotelUtility;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteHotelUtility;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateHotelUtility;
using Application.Features.Utilities.Services.Command.CreateHotelUtility;
using Application.Features.Utilities.Services.Command.DeleteHotelUtility;
using Application.Features.Utilities.Services.Command.UpdateHotelUtility;

namespace WebAPI.DependencyInjection.Features
{
    public static class UtilityServiceRegistration
    {
        public static IServiceCollection AddUtilityServices(this IServiceCollection services)
        {
            //Utilities
            //Repositories
            services.AddScoped<IUtilityRepository, UtilityRepository>();
            services.AddScoped<IUtilityItemRepository, UtilityItemRepository>();
            services.AddScoped<IRoomUtilityRepository, RoomUtilityRepository>();
            services.AddScoped<IHotelUtilityRepository, HotelUtilityRepository>();

            //Create Utility
            services.AddScoped<ICreateUtilityService, CreateUtilityService>();

            //Delete Utility
            services.AddScoped<IDeleteUtilityService, DeleteUtilityService>();

            //Update Utility
            services.AddScoped<IUpdateUtilityService, UpdateUtilityService>();

            //Create Utility Item
            services.AddScoped<ICreateUtilityItemService, CreateUtilityItemService>();

            //Delete Utility Item
            services.AddScoped<IDeleteUtilityItemService, DeleteUtilityItemService>();

            //Update Utility Item
            services.AddScoped<IUpdateUtilityItemService, UpdateUtilityItemService>();

            //Get All Utilities
            services.AddScoped<IGetAllUtilitiesService, GetAllUtilitiesService>();

            //Get Utility By Id
            services.AddScoped<IGetUtilityByIdService, GetUtilityByIdService>();

            //Get Utility Items By Hotel Id
            services.AddScoped<IGetUtilityByHotelIdService, GetUtilityByHotelIdService>();

            //Get Utility Items By Room Id
            services.AddScoped<IGetUtilityByRoomIdService, GetUtilityByRoomIdService>();

            //Get Utility Items By Utility Id
            services.AddScoped<IGetUtilityItemsByUtilityIdService, GetUtilityItemsByUtilityIdService>();

            //Create Hotel Utility
            services.AddScoped<ICreateHotelUtilityService, CreateHotelUtilityService>();

            //Update Hotel Utility
            services.AddScoped<IUpdateHotelUtilityService, UpdateHotelUtilityService>();

            //Delete Hotel Utility
            services.AddScoped<IDeleteHotelUtilityService, DeleteHotelUtilityService>();

            return services;
        }
    }
}
