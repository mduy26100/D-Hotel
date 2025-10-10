namespace Application.Features.Rooms.DTOs
{
    public class UpsertRoomTypeImageRequest
    {
        public int? Id { get; set; }
        public int RoomTypeId { get; set; }
        public string ImgUrl { get; set; } = default!;
        public Stream? ImgContent { get; set; }
        public string? ImgFileName { get; set; }
        public string? ImgContentType { get; set; }
    }
}
