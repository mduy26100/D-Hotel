namespace Domain.Models.Rooms
{
    public class RoomTypePrice
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }

        // Giá áp dụng trong thời gian khuyến mãi / theo mùa
        public decimal Price { get; set; }

        // Khoảng thời gian có hiệu lực
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Loại giá: Khuyến mãi, Mùa cao điểm, Ngày lễ...
        public string? PriceType { get; set; } // ví dụ: "Promotion", "PeakSeason", "Holiday"

        // Cờ kích hoạt
        public bool IsActive { get; set; } = true;
    }
}
