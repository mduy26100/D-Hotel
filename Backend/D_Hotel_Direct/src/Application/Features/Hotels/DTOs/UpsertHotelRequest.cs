namespace Application.Features.Hotels.DTOs
{
    public class UpsertHotelRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; } = default!;
        public int CategoryId { get; set; }
        public Guid HotelManagerId { get; set; }
        public string Address { get; set; } = default!;
        public string Description { get; set; } = default!;
        public bool IsActive { get; set; }
        public Stream? ImgContent { get; set; }
        public string? ImgFileName { get; set; }
        public string? ImgContentType { get; set; }
    }
}
