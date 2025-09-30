using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.CreateHotelTravelPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.DeleteHotelTravelPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.UpdateHotelTravelPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.CreateRoomPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.DeleteRoomPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.UpdateRoomPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.CreateRoomTypePurpose;
using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.DeleteRoomTypePurpose;
using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.UpdateRoomTypePurpose;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.CreateTravelPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.DeleteTravelPurpose;
using Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.UpdateTravelPurpose;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetAllHotelTravelPurposes;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetHotelsByTravelPurposeId;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetAllRoomPurposes;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetRoomPurposeById;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetAllRoomTypePurposes;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetAllTravelPurposes;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetTravelPurposeById;
using Application.Features.Purposes.Repositories;
using Application.Features.Purposes.Services.Command.HotelTravelPurpose.CreateHotelTravelPurpose;
using Application.Features.Purposes.Services.Command.HotelTravelPurpose.DeleteHotelTravelPurpose;
using Application.Features.Purposes.Services.Command.HotelTravelPurpose.UpdateHotelTravelPurpose;
using Application.Features.Purposes.Services.Command.RoomPurpose.CreateRoomPurpose;
using Application.Features.Purposes.Services.Command.RoomPurpose.DeleteRoomPurpose;
using Application.Features.Purposes.Services.Command.RoomPurpose.UpdateRoomPurpose;
using Application.Features.Purposes.Services.Command.RoomTypePurpose.CreateRoomTypePurpose;
using Application.Features.Purposes.Services.Command.RoomTypePurpose.DeleteRoomTypePurpose;
using Application.Features.Purposes.Services.Command.RoomTypePurpose.UpdateRoomTypePurpose;
using Application.Features.Purposes.Services.Command.TravelPurpose.CreateTravelPurpose;
using Application.Features.Purposes.Services.Command.TravelPurpose.DeleteTravelPurpose;
using Application.Features.Purposes.Services.Command.TravelPurpose.UpdateTravelPurpose;
using Application.Features.Purposes.Services.Query.HotelTravelPurpose.GetAllHotelTravelPurposes;
using Application.Features.Purposes.Services.Query.HotelTravelPurpose.GetHotelsByTravelPurposeId;
using Application.Features.Purposes.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId;
using Application.Features.Purposes.Services.Query.RoomPurpose.GetAllRoomPurposes;
using Application.Features.Purposes.Services.Query.RoomPurpose.GetRoomPurposeById;
using Application.Features.Purposes.Services.Query.RoomTypePurpose.GetAllRoomTypePurposes;
using Application.Features.Purposes.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId;
using Application.Features.Purposes.Services.Query.TravelPurpose.GetAllTravelPurposes;
using Application.Features.Purposes.Services.Query.TravelPurpose.GetTravelPurposeById;
using Infrastructure.Purposes.Repositories;
using Microsoft.AspNetCore.WebSockets;

namespace WebAPI.DependencyInjection.Features
{
    public static class PurposeServiceRegistration
    {
        public static IServiceCollection AddPurposeService(this IServiceCollection services)
        {
            //Repositories
            services.AddScoped<IHotelTravelPurposeRepository, HotelTravelPurposeRepository>();
            services.AddScoped<IRoomPurposeRepository, RoomPurposeRepository>();
            services.AddScoped<IRoomTypePurposeRepository, RoomTypePurposeRepository>();
            services.AddScoped<ITravelPurposeRepository, TravelPurposeRepository>();

            //Create Hotel Travel Purpose
            services.AddScoped<ICreateHotelTravelPurposeService, CreateHotelTravelPurposeService>();

            //Delete Hotel Travel Purpose
            services.AddScoped<IDeleteHotelTravelPurposeService, DeleteHotelTravelPurposeService>();

            //Update Hotel Travel Purpose
            services.AddScoped<IUpdateHotelTravelPurposeService, UpdateHotelTravelPurposeService>();

            //Get All Hotel Travel Purposes
            services.AddScoped<IGetAllHotelTravelPurposesService, GetAllHotelTravelPurposesService>();

            //Get Hotels By Travel Purpose Id
            services.AddScoped<IGetHotelsByTravelPurposeIdService, GetHotelsByTravelPurposeIdService>();

            //Get Travel Purpose By Hotel Id
            services.AddScoped<IGetTravelPurposeByHotelIdService, GetTravelPurposeByHotelIdService>();

            //Create Room Purpose
            services.AddScoped<ICreateRoomPurposeService, CreateRoomPurposeService>();

            //Delete Room Purpose
            services.AddScoped<IDeleteRoomPurposeService, DeleteRoomPurposeService>();

            //Update Room Purpose
            services.AddScoped<IUpdateRoomPurposeService, UpdateRoomPurposeService>();

            //Get All Room Purposes
            services.AddScoped<IGetAllRoomPurposesService, GetAllRoomPurposesService>();

            //Get Room Purpose By Id
            services.AddScoped<IGetRoomPurposeByIdService, GetRoomPurposeByIdService>();

            //Create Room Type Purpose
            services.AddScoped<ICreateRoomTypePurposeService, CreateRoomTypePurposeService>();

            //Delete Room Type Purpose
            services.AddScoped<IDeleteRoomTypePurposeService, DeleteRoomTypePurposeService>();

            //Update Room Type Purpose
            services.AddScoped<IUpdateRoomTypePurposeService, UpdateRoomTypePurposeService>();

            //Get All Room Type Purposes
            services.AddScoped<IGetAllRoomTypePurposesService, GetAllRoomTypePurposesService>();

            //Get Room Type Purpose By Room Id
            services.AddScoped<IGetRoomPurposeByRoomIdService, GetRoomPurposeByRoomIdService>();

            //Create Travel Purpose
            services.AddScoped<ICreateTravelPurposeService, CreateTravelPurposeService>();

            //Delete Travel Purpose
            services.AddScoped<IDeleteTravelPurposeService, DeleteTravelPurposeService>();

            //Update Travel Purpose
            services.AddScoped<IUpdateTravelPurposeService, UpdateTravelPurposeService>();

            //Get All Travel Purposes
            services.AddScoped<IGetAllTravelPurposesService, GetAllTravelPurposesService>();

            //Get Travel Purpose By Id
            services.AddScoped<IGetTravelPurposeByIdService, GetTravelPurposeByIdService>();

            return services;
        }
    }
}
