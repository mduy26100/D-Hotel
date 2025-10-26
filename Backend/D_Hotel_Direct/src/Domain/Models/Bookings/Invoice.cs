namespace Domain.Models.Bookings
{
    public class Invoice
    {
        public int Id { get; set; }
        public int BookingId { get; set; }

        public required string InvoiceNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public required string PaymentMethod { get; set; }
        public DateTime IssuedDate { get; set; }
        public required string Status { get; set; }

        public string? PaymentIntentId { get; set; }
    }
}
