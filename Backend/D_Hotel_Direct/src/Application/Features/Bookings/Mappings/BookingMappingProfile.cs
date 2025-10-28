using Application.Features.Bookings.DTOs;
using AutoMapper;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Mappings
{
    public class BookingMappingProfile : Profile
    {
        public BookingMappingProfile()
        {
            CreateMap<Booking, BookingDto>().ReverseMap();
            CreateMap<BookingDetail, BookingDetailDto>().ReverseMap();
            CreateMap<Invoice, InvoiceDto>().ReverseMap();
            CreateMap<Rating, RatingDto>().ReverseMap();
        }
    }
}
