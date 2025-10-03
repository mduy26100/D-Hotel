namespace Application.Features.Bookings.DTOs
{
    public class BookingAggregateDto
    {
        public BookingDto Booking { get; set; } = null!;
        public IEnumerable<BookingDetailDto> Details { get; set; } = new List<BookingDetailDto>();
        public InvoiceDto? Invoice { get; set; }
    }
}
