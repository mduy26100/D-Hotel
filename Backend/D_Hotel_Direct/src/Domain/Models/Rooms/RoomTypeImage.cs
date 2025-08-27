namespace Domain.Models.Rooms
{
    public class RoomTypeImage
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }
        public required string ImgUrl { get; set; }
    }
}
