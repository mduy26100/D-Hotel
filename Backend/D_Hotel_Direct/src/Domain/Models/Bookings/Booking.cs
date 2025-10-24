namespace Domain.Models.Bookings
{
    public class Booking
    {
        public int Id { get; set; }

        public Guid? UserId { get; set; }
        public int HotelId { get; set; }

        // 🔗 Liên kết tới loại phòng
        public int RoomTypeId { get; set; }

        // 🕓 Thông tin thời gian thuê
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }

        // 📌 Thông tin snapshot theo RoomType
        public decimal RentalPrice { get; set; }
        public string? RentalType { get; set; }


        // 👤 Thông tin khách
        public required string GuestName { get; set; }
        public required string GuestPhone { get; set; }
        public string? GuestEmail { get; set; }

        // 🧾 Ghi chú & thông tin đặt phòng
        public string? Note { get; set; }

        public Guid? CreatedByStaffId { get; set; }
        public bool IsWalkIn { get; set; }

        // ⚙️ Trạng thái
        public required string Status { get; set; }           // Pending / Confirmed / Cancelled
        public DateTime BookingDate { get; set; }

    }
}
