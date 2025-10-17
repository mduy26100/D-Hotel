namespace Application.Features.Rooms.DTOs
{
    public class RoomTypeDto
    {
        public int Id { get; set; }
        public int HotelId { get; set; }

        public required string Name { get; set; }
        public required string Description { get; set; }

        // Giá cơ bản / 1 đêm
        public decimal BasePrice { get; set; }

        // Diện tích (m2)
        public required string Area { get; set; }

        // Thông tin tham chiếu — chỉ lưu ID, không có navigation
        public int QuantityGuestId { get; set; }
        public int BedTypeId { get; set; }

        // Số lượng phòng kiểu này
        public int Quantity { get; set; }

        public bool IsActive { get; set; }
    }
}
