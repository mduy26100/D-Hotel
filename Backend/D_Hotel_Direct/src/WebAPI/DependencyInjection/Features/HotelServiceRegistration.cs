using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelStaff;
using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelStaff;
using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelStaff;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelStaffs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelDetail;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffById;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffsByHotelId;
using Application.Features.Hotels.Services.Command.CreateHotelStaff;
using Application.Features.Hotels.Services.Command.DeleteHotelStaff;
using Application.Features.Hotels.Services.Command.UpdateHotelStaff;
using Application.Features.Hotels.Services.Query.GetAllHotelStaffs;
using Application.Features.Hotels.Services.Query.GetHotelDetail;
using Application.Features.Hotels.Services.Query.GetHotelStaffById;
using Application.Features.Hotels.Services.Query.GetHotelStaffsByHotelId;

namespace WebAPI.DependencyInjection.Features
{
    public static class HotelServiceRegistration
    {
        public static IServiceCollection AddHotelServices(this IServiceCollection services)
        {
            //Hotels
            //Repositories
            services.AddScoped<IHotelRepository, HotelRepository>();
            services.AddScoped<IHotelCategoryRepository, HotelCategoryRepository>();
            services.AddScoped<IHotelStaffRepository, HotelStaffRepository>();

            //Create Hotel
            services.AddScoped<ICreateHotelService, CreateHotelService>();

            //Delete Hotel
            services.AddScoped<IDeleteHotelService, DeleteHotelService>();

            //Update Hotel
            services.AddScoped<IUpdateHotelService, UpdateHotelService>();

            //Create Hotel Category
            services.AddScoped<ICreateHotelCategoryService, CreateHotelCategoryService>();

            //Delete Hotel Category
            services.AddScoped<IDeleteHotelCategoryService, DeleteHotelCategoryService>();

            //Update Hotel Category
            services.AddScoped<IUpdateHotelCategoryService, UpdateHotelCategoryService>();

            //Get All Hotels
            services.AddScoped<IGetAllHotelsService, GetAllHotelsService>();

            //GetHotel By Id
            services.AddScoped<IGetHotelByIdService, GetHotelByIdService>();

            //Get Hotel Detail By Id
            services.AddScoped<IGetHotelDetailService, GetHotelDetailService>();

            //Get Hotels By Category Id
            services.AddScoped<IGetHotelsByCategoryIdService, GetHotelsByCategoryIdService>();

            //Get All Hotel Categories
            services.AddScoped<IGetAllHotelCategoriesService, GetAllHotelCategoriesService>();

            //Get All Hotel Category By Id
            services.AddScoped<IGetHotelCategoryByIdService, GetHotelCategoryByIdService>();

            //Create Hotel Staff
            services.AddScoped<ICreateHotelStaffService, CreateHotelStaffService>();

            //Update Hotel Staff
            services.AddScoped<IUpdateHotelStaffService, UpdateHotelStaffService>();

            //Delete HotelStaff
            services.AddScoped<IDeleteHotelStaffService, DeleteHotelStaffService>();

            //Get All Hotel Staffs
            services.AddScoped<IGetAllHotelStaffsService, GetAllHotelStaffsService>();

            //Get Hotel Staffs By HotelId
            services.AddScoped<IGetHotelStaffsByHotelIdService, GetHotelStaffsByHotelIdService>();

            //Get Hotel Staff By Id
            services.AddScoped<IGetHotelStaffByIdService, GetHotelStaffByIdService>();


            return services;
        }
    }
}
