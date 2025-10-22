namespace Domain.Models.Rooms
{
    public class RoomTypePrice
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }

        // Loại giá: Khuyến mãi, Mùa cao điểm, Ngày lễ...
        public required string PriceType { get; set; } // ví dụ: "Promotion", "PeakSeason", "Holiday"

        // Giá theo giờ
        public decimal? BaseHourlyPrice { get; set; } // giá theo giờ
        public decimal? ExtraHourPrice { get; set; } // giá giờ thêm

        // Giá qua đêm
        public decimal? OvernightPrice { get; set; } // giá qua đêm

        // Giá theo ngày
        public decimal? DailyPrice { get; set; } // giá theo ngày

        // Khoảng thời gian có hiệu lực
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Cờ kích hoạt
        public bool IsActive { get; set; } = true;
    }
}
