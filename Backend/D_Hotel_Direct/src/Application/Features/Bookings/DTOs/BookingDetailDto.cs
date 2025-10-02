namespace Application.Features.Bookings.DTOs
{
    public class BookingDetailDto
    {
        public int Id { get; set; }
        public int BookingId { get; set; }

        public required string ItemType { get; set; }
        public int? ItemId { get; set; }
        public required string ItemName { get; set; }

        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
