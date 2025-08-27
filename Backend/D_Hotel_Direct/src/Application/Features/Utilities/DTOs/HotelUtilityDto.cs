namespace Application.Features.Utilities.DTOs
{
    public class HotelUtilityDto
    {
        public int HotelId { get; set; }
        public List<int> UtilityIds { get; set; } = new();
    }
}
