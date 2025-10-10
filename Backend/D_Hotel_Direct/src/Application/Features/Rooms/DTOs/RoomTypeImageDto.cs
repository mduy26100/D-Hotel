namespace Application.Features.Rooms.DTOs
{
    public class RoomTypeImageDto
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }
        public string ImgUrl { get; set; } = default!;
    }
}
