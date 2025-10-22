namespace Domain.Models.Rooms
{
    public class RoomType
    {
        public int Id { get; set; }
        public int HotelId { get; set; }

        public required string Name { get; set; }
        public required string Description { get; set; }

        // --- Thuê theo giờ ---
        public decimal? BaseHourlyPrice { get; set; }      // Giá cố định cho BaseHours đầu
        public int? BaseHours { get; set; }                // Số giờ đầu
        public decimal? ExtraHourPrice { get; set; }       // Giá mỗi giờ thêm
        public int? MaxHours { get; set; }                 // Giới hạn số giờ (vd: 6h)

        // --- Thuê qua đêm ---
        public decimal? OvernightPrice { get; set; }
        public TimeSpan? OvernightStartTime { get; set; }  // ví dụ: 22:00
        public TimeSpan? OvernightEndTime { get; set; }    // ví dụ: 06:00

        // --- Thuê theo ngày ---
        public decimal? DailyPrice { get; set; }
        public TimeSpan? DailyStartTime { get; set; }
        public TimeSpan? DailyEndTime { get; set; }

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
