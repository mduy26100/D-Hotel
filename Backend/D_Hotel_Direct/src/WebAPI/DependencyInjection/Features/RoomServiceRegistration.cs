using Application.Features.Rooms.Interfaces.Services.Command.BedType.CreateBedType;
using Application.Features.Rooms.Interfaces.Services.Command.BedType.DeleteBedType;
using Application.Features.Rooms.Interfaces.Services.Command.BedType.UpdateBedType;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.CreateQuantityGuest;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.DeleteQuantityGuest;
using Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.UpdateQuantityGuest;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.CreateRoomType;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.DeleteRoomType;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.UpdateRoomType;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.CreateRoomTypeImage;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.DeleteRoomTypeImage;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.UpdateRoomTypeImage;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.CreateRoomTypePrice;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.DeleteRoomTypePrice;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.UpdateRoomTypePrice;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetAllBedTypes;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetBedTypeById;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetAllQuantityGuests;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetQuantityGuestById;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetAllRoomTypes;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomsByHotelId;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByBedTypeId;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeById;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByQuantityGuestId;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeDetailById;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypePrice.GetAllRoomTypePrices;
using Application.Features.Rooms.Repositories;
using Application.Features.Rooms.Services.Command.BedType.CreateBedType;
using Application.Features.Rooms.Services.Command.BedType.DeleteBedType;
using Application.Features.Rooms.Services.Command.BedType.UpdateBedType;
using Application.Features.Rooms.Services.Command.QuantityGuest.CreateQuantityGuest;
using Application.Features.Rooms.Services.Command.QuantityGuest.DeleteQuantityGuest;
using Application.Features.Rooms.Services.Command.QuantityGuest.UpdateQuantityGuest;
using Application.Features.Rooms.Services.Command.RoomType.CreateRoomType;
using Application.Features.Rooms.Services.Command.RoomType.DeleteRoomType;
using Application.Features.Rooms.Services.Command.RoomType.UpdateRoomType;
using Application.Features.Rooms.Services.Command.RoomTypeImage.CreateRoomTypeImage;
using Application.Features.Rooms.Services.Command.RoomTypeImage.DeleteRoomTypeImage;
using Application.Features.Rooms.Services.Command.RoomTypeImage.UpdateRoomTypeImage;
using Application.Features.Rooms.Services.Command.RoomTypePrice.CreateRoomTypePrice;
using Application.Features.Rooms.Services.Command.RoomTypePrice.DeleteRoomTypePrice;
using Application.Features.Rooms.Services.Command.RoomTypePrice.UpdateRoomTypePrice;
using Application.Features.Rooms.Services.Query.BedType.GetAllBedTypes;
using Application.Features.Rooms.Services.Query.BedType.GetBedTypeById;
using Application.Features.Rooms.Services.Query.QuantityGuest.GetAllQuantityGuests;
using Application.Features.Rooms.Services.Query.QuantityGuest.GetQuantityGuestById;
using Application.Features.Rooms.Services.Query.RoomType.GetAllRoomTypes;
using Application.Features.Rooms.Services.Query.RoomType.GetRoomsByHotelId;
using Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeByBedTypeId;
using Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeById;
using Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeByQuantityGuestId;
using Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeDetailById;
using Application.Features.Rooms.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using Application.Features.Rooms.Services.Query.RoomTypePrice.GetAllRoomTypePrices;
using Infrastructure.Rooms.Repositories;

namespace WebAPI.DependencyInjection.Features
{
    public static class RoomServiceRegistration
    {
        public static IServiceCollection AddRoomService(this IServiceCollection services)
        {
            //Repositories
            services.AddScoped<IBedTypeRepository, BedTypeRepository>();
            services.AddScoped<IQuantityGuestRepository, QuantityGuestRepository>();
            services.AddScoped<IRoomTypeImageRepository, RoomTypeImageRepository>();
            services.AddScoped<IRoomTypeRepository, RoomTypeRepository>();
            services.AddScoped<IRoomTypePriceRepository, RoomTypePriceRepository>();

            //BedType
            services.AddScoped<ICreateBedTypeService, CreateBedTypeService>();
            services.AddScoped<IDeleteBedTypeService, DeleteBedTypeService>();
            services.AddScoped<IUpdateBedTypeService, UpdateBedTypeService>();
            services.AddScoped<IGetAllBedTypesService, GetAllBedTypesService>();
            services.AddScoped<IGetBedTypeByIdService, GetBedTypeByIdService>();

            //QuantityGuest
            services.AddScoped<ICreateQuantityGuestService, CreateQuantityGuestService>();
            services.AddScoped<IDeleteQuantityGuestService, DeleteQuantityGuestService>();
            services.AddScoped<IUpdateQuantityGuestService, UpdateQuantityGuestService>();
            services.AddScoped<IGetAllQuantityGuestsService, GetAllQuantityGuestsService>();
            services.AddScoped<IGetQuantityGuestByIdService, GetQuantityGuestByIdService>();

            //RoomType
            services.AddScoped<ICreateRoomTypeService, CreateRoomTypeService>();
            services.AddScoped<IDeleteRoomTypeService, DeleteRoomTypeService>();
            services.AddScoped<IUpdateRoomTypeService, UpdateRoomTypeService>();
            services.AddScoped<IGetAllRoomTypesService, GetAllRoomTypesService>();
            services.AddScoped<IGetRoomTypeByIdService, GetRoomTypeByIdService>();
            services.AddScoped<IGetRoomTypeByBedTypeIdService, GetRoomTypeByBedTypeIdService>();
            services.AddScoped<IGetRoomTypeByQuantityGuestIdService, GetRoomTypeByQuantityGuestIdService>();
            services.AddScoped<IGetRoomTypeDetailByIdService, GetRoomTypeDetailByIdService>();
            services.AddScoped<IGetRoomsByHotelIdService, GetRoomsByHotelIdService>();

            //RoomTypeImage
            services.AddScoped<ICreateRoomTypeImageService, CreateRoomTypeImageService>();
            services.AddScoped<IDeleteRoomTypeImageService, DeleteRoomTypeImageService>();
            services.AddScoped<IUpdateRoomTypeImageService, UpdateRoomTypeImageService>();
            services.AddScoped<IGetRoomImagesByRoomTypeIdService, GetRoomImagesByRoomTypeIdService>();

            //RoomTypePrice
            services.AddScoped<ICreateRoomTypePriceService, CreateRoomTypePriceService>();
            services.AddScoped<IUpdateRoomTypePriceService, UpdateRoomTypePriceService>();
            services.AddScoped<IDeleteRoomTypePriceService, DeleteRoomTypePriceService>();
            services.AddScoped<IGetAllRoomTypePricesService, GetAllRoomTypePricesService>();

            return services;
        }
    }
}
