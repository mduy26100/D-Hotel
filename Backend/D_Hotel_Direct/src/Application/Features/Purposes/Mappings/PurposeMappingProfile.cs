using Application.Features.Purposes.DTOs;
using AutoMapper;
using Domain.Models.Purposes;

namespace Application.Features.Purposes.Mappings
{
    public class PurposeMappingProfile : Profile
    {
        public PurposeMappingProfile()
        {
            CreateMap<HotelTravelPurpose, HotelTravelPurposeDto>().ReverseMap();
            CreateMap<RoomPurpose, RoomPurposeDto>().ReverseMap();
            CreateMap<RoomTypePurpose, RoomTypePurposeDto>().ReverseMap();
            CreateMap<TravelPurpose, TravelPurposeDto>().ReverseMap();
        }
    }
}
