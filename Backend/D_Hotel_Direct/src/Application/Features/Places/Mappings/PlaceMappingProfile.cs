using Application.Features.Places.DTOs;
using AutoMapper;
using Domain.Models.Places;

namespace Application.Features.Places.Mappings
{
    public class PlaceMappingProfile : Profile
    {
        public PlaceMappingProfile()
        {
            CreateMap<Locations, LocationsDto>().ReverseMap();
            CreateMap<HotelLocations, HotelLocationsDto>().ReverseMap();
        }
    }
}
