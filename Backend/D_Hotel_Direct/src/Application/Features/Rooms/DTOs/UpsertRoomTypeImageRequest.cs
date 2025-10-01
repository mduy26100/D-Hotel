namespace Application.Features.Rooms.DTOs
{
    public class UpsertRoomTypeImageRequest
    {
        public int? Id { get; set; }
        public int RoomTypeId { get; set; }
        public required string ImgUrl { get; set; }
        public Stream? ImgContent { get; set; }
        public string? ImgFileName { get; set; }
        public string? ImgContentType { get; set; }
    }
}
