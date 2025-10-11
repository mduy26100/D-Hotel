namespace Application.Features.Utilities.DTOs
{
    public class RoomUtilityDto
    {
        public int RoomId { get; set; }
        public List<int> UtilityIds { get; set; } = new();
        public List<UtilityDto> Utilities { get; set; } = new();
    }
}
