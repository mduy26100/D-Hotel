namespace Application.Features.Hotels.DTOs
{
    public class HotelDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public Guid HotelManagerId { get; set; }
        public string? HotelManagerName { get; set; }
        public string Address { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string ImgUrl { get; set; } = default!;
        public bool IsActive { get; set; }
    }
}
