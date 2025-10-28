namespace Application.Features.Bookings.DTOs
{
    public class RatingDto
    {
        public int Id { get; set; }                // Khóa chính
        public int BookingId { get; set; }         // Booking được đánh giá
        public Guid UserId { get; set; }            // Người đánh giá
        public string? NameUser { get; set; }
        public int HotelId { get; set; }           // Khách sạn được đánh giá

        public int RatingValue { get; set; }       // Giá trị đánh giá (1-5)
        public string? Comment { get; set; }       // Nhận xét (có thể để trống)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Ngày tạo
    }
}
