using Application.Features.Places.Interfaces.Services.Command.CreateHotelLocation;
using Application.Features.Places.Interfaces.Services.Command.CreateLocation;
using Application.Features.Places.Interfaces.Services.Command.DeleteHotelLocation;
using Application.Features.Places.Interfaces.Services.Command.DeleteLocation;
using Application.Features.Places.Interfaces.Services.Command.UpdateHotelLocation;
using Application.Features.Places.Interfaces.Services.Command.UpdateLocation;
using Application.Features.Places.Interfaces.Services.Query.GetAllHotelLocations;
using Application.Features.Places.Interfaces.Services.Query.GetAllLocations;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByLocationId;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using Application.Features.Places.Repositories;
using Application.Features.Places.Services.Command.CreateHotelLocation;
using Application.Features.Places.Services.Command.CreateLocation;
using Application.Features.Places.Services.Command.DeleteHotelLocation;
using Application.Features.Places.Services.Command.DeleteLocation;
using Application.Features.Places.Services.Command.UpdateHotelLocation;
using Application.Features.Places.Services.Command.UpdateLocation;
using Application.Features.Places.Services.Query.GetAllHotelLocations;
using Application.Features.Places.Services.Query.GetAllLocations;
using Application.Features.Places.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Services.Query.GetHotelLocationByLocationId;
using Application.Features.Places.Services.Query.GetLocationById;
using Infrastructure.Places.Repositories;

namespace WebAPI.DependencyInjection.Features
{
    public static class PlacesServiceRegistration
    {
        public static IServiceCollection AddPlaceServices(this IServiceCollection services)
        {
            //Places
            //Repositories
            services.AddScoped<ILocationsRepository, LocationsRepository>();
            services.AddScoped<IHotelLocationsRepository, HotelLocationsRepository>();

            //Create Location
            services.AddScoped<ICreateLocationService, CreateLocationService>();

            //Get All Locations
            services.AddScoped<IGetAllLocationsService, GetAllLocationsService>();

            //Delete Location
            services.AddScoped<IDeleteLocationService, DeleteLocationService>();

            //Update Location
            services.AddScoped<IUpdateLocationService, UpdateLocationService>();

            //Get Location By Id
            services.AddScoped<IGetLocationByIdService, GetLocationByIdService>();

            //Create Hotel Location
            services.AddScoped<ICreateHotelLocationService, CreateHotelLocationService>();

            //Update Hotel Location
            services.AddScoped<IUpdateHotelLocationService, UpdateHotelLocationService>();

            //Delete Hotel Location
            services.AddScoped<IDeleteHotelLocationService, DeleteHotelLocationService>();

            //Get All Hotel Locations
            services.AddScoped<IGetAllHotelLocationsService, GetAllHotelLocationsService>();

            //Get Hotel Location By Hotel Id
            services.AddScoped<IGetHotelLocationByHotelIdService, GetHotelLocationByHotelIdService>();

            //Get Hotel Location By Location Id
            services.AddScoped<IGetHotelLocationByLocationIdService, GetHotelLocationByLocationIdService>();

            return services;
        }
    }
}
