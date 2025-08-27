using Application.Features.Hotels.DTOs;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Mappings
{
    public class HotelMappingProfile : Profile
    {
        public HotelMappingProfile()
        {
            CreateMap<Hotel, HotelDto>().ReverseMap();
            CreateMap<HotelCategory, HotelCategoryDto>().ReverseMap();
        }
    }
}
