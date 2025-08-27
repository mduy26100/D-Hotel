using Application.Features.Utilities.DTOs;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Mappings
{
    public class UtilityMappingProfile : Profile
    {
        public UtilityMappingProfile()
        {
            CreateMap<Utility, UtilityDto>().ReverseMap();
            CreateMap<UtilityItem, UtilityItemDto>().ReverseMap();
            CreateMap<HotelUtility, HotelUtilityDto>().ReverseMap();
            CreateMap<RoomUtility, RoomUtilityDto>().ReverseMap();
        }
    }
}
