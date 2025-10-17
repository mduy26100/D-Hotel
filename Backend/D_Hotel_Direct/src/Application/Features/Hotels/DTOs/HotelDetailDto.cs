using Application.Features.Places.DTOs;
using Application.Features.Purposes.DTOs;
using Application.Features.Utilities.DTOs;

namespace Application.Features.Hotels.DTOs
{
    public class HotelDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string ImgUrl { get; set; } = default!;
        public bool IsActive { get; set; }

        public string HotelManagerName { get; set; } = default!;
        public HotelCategoryDto Category { get; set; } = null!;
        public LocationsDto? Location { get; set; }
        public IEnumerable<UtilityDto> Utilities { get; set; } = new List<UtilityDto>();
        public TravelPurposeDto? TravelPurpose { get; set; }
    }
}
