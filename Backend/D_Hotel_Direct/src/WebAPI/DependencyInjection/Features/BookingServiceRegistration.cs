using Application.Features.Bookings.Configurations;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.Factory;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.PaymentStrategies;
using Application.Features.Bookings.Interfaces.Services.Command.CreateRating;
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
using Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByHotelId;
using Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByUserId;
using Application.Features.Bookings.PaymentStrategies;
using Application.Features.Bookings.Repositories;
using Application.Features.Bookings.Services.Command.CreateBooking;
using Application.Features.Bookings.Services.Command.CreateBooking.Factory;
using Application.Features.Bookings.Services.Command.CreateBooking.PaymentStrategies;
using Application.Features.Bookings.Services.Command.CreateRating;
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
using Application.Features.Bookings.Services.Query.Rating.GetRatingsByHotelId;
using Application.Features.Bookings.Services.Query.Rating.GetRatingsByUserId;
using Infrastructure.Bookings.Repositories;

namespace WebAPI.DependencyInjection.Features
{
    public static class BookingServiceRegistration
    {
        public static IServiceCollection AddBookingServices(this IServiceCollection services, IConfiguration configuration)
        {
            //Repositories
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IBookingDetailRepository, BookingDetailRepository>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            services.AddScoped<IRatingRepository, RatingRepository>();

            //Booking
            services.AddScoped<ICreateBookingService, CreateBookingService>();
            services.AddScoped<IDeleteBookingService, DeleteBookingService>();
            services.AddScoped<IUpdateBookingService, UpdateBookingService>();
            services.AddScoped<IPaymentStrategy, OnSitePaymentStrategy>();
            services.AddScoped<IPaymentStrategy, StripePaymentStrategy>();
            services.AddScoped<IPaymentStrategyFactory, PaymentStrategyFactory>();

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


            //Rating
            services.AddScoped<ICreateRatingService, CreateRatingService>();
            services.AddScoped<IGetRatingsByHotelIdService, GetRatingsByHotelIdService>();
            services.AddScoped<IGetRatingsByUserIdService, GetRatingsByUserIdService>();

            services.Configure<StripeSettings>(
                configuration.GetSection("Stripe"));

            return services;
        }
    }
}
