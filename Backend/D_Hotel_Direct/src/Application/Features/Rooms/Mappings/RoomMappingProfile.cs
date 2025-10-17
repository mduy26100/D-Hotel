using Application.Features.Rooms.DTOs;
using AutoMapper;
using Domain.Models.Rooms;

namespace Application.Features.Rooms.Mappings
{
    public class RoomMappingProfile : Profile
    {
        public RoomMappingProfile()
        {
            CreateMap<BedType, BedTypeDto>().ReverseMap();
            CreateMap<QuantityGuest, QuantityGuestDto>().ReverseMap();
            CreateMap<RoomType, RoomTypeDto>().ReverseMap();
            CreateMap<RoomTypeImage, RoomTypeImageDto>().ReverseMap();
            CreateMap<RoomTypePrice, RoomTypePriceDto>().ReverseMap();
        }
    }
}
