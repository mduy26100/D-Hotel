namespace Application.Features.Bookings.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public Guid? UserId { get; set; }
        public int HotelId { get; set; }
        public int RoomTypeId { get; set; }

        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }

        public required string GuestName { get; set; }
        public required string GuestPhone { get; set; }
        public string? GuestEmail { get; set; }

        public string? Note { get; set; }

        public Guid? CreatedByStaffId { get; set; }
        public bool IsWalkIn { get; set; }

        public required string Status { get; set; }
        public DateTime BookingDate { get; set; }
    }
}
