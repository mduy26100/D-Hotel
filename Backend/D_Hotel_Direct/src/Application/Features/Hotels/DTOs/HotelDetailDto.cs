using Application.Features.Places.DTOs;
using Application.Features.Utilities.DTOs;

namespace Application.Features.Hotels.DTOs
{
    public class HotelDetailDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public HotelCategoryDto Category { get; set; } = null!;
        public Guid HotelManagerId { get; set; }
        public required string Address { get; set; }
        public required string Description { get; set; }
        public required string ImgUrl { get; set; }
        public bool IsActive { get; set; }
        public LocationsDto? Location { get; set; }

        public List<UtilityDto> Utilities { get; set; } = new();
    }
}
