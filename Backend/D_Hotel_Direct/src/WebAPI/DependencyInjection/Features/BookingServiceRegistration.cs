using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using Application.Features.Bookings.Interfaces.Services.Command.DeleteBooking;
using Application.Features.Bookings.Interfaces.Services.Command.UpdateBooking;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetAllBookings;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingById;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingFullInfo;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByDateRange;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailById;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsByBookingId;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetAllInvoices;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceByBookingId;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceById;
using Application.Features.Bookings.Repositories;
using Application.Features.Bookings.Services.Command.CreateBooking;
using Application.Features.Bookings.Services.Command.DeleteBooking;
using Application.Features.Bookings.Services.Command.UpdateBooking;
using Application.Features.Bookings.Services.Query.Booking.GetAllBookings;
using Application.Features.Bookings.Services.Query.Booking.GetBookingById;
using Application.Features.Bookings.Services.Query.Booking.GetBookingFullInfo;
using Application.Features.Bookings.Services.Query.Booking.GetBookingsByDateRange;
using Application.Features.Bookings.Services.Query.Booking.GetBookingsByUserId;
using Application.Features.Bookings.Services.Query.BookingDetail.GetBookingDetailById;
using Application.Features.Bookings.Services.Query.BookingDetail.GetBookingDetailsByBookingId;
using Application.Features.Bookings.Services.Query.Invoice.GetAllInvoices;
using Application.Features.Bookings.Services.Query.Invoice.GetInvoiceByBookingId;
using Application.Features.Bookings.Services.Query.Invoice.GetInvoiceById;
using Infrastructure.Bookings.Repositories;

namespace WebAPI.DependencyInjection.Features
{
    public static class BookingServiceRegistration
    {
        public static IServiceCollection AddBookingServices(this IServiceCollection services)
        {
            //Repositories
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IBookingDetailRepository, BookingDetailRepository>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();

            //Booking
            services.AddScoped<ICreateBookingService, CreateBookingService>();
            services.AddScoped<IDeleteBookingService, DeleteBookingService>();
            services.AddScoped<IUpdateBookingService, UpdateBookingService>();

            services.AddScoped<IGetAllBookingsService, GetAllBookingsService>();
            services.AddScoped<IGetBookingByIdService, GetBookingByIdService>();
            services.AddScoped<IGetBookingFullInfoService, GetBookingFullInfoService>();
            services.AddScoped<IGetBookingsByDateRangeService, GetBookingsByDateRangeService>();
            services.AddScoped<IGetBookingsByUserIdService, GetBookingsByUserIdService>();

            //Booking Details
            services.AddScoped<IGetBookingDetailsByBookingIdService, GetBookingDetailsByBookingIdService>();
            services.AddScoped<IGetBookingDetailByIdService, GetBookingDetailByIdService>();

            //Invoice
            services.AddScoped<IGetAllInvoicesService, GetAllInvoicesService>();
            services.AddScoped<IGetInvoiceByBookingIdService, GetInvoiceByBookingIdService>();
            services.AddScoped<IGetInvoiceByIdService, GetInvoiceByIdService>();

            return services;
        }
    }
}
