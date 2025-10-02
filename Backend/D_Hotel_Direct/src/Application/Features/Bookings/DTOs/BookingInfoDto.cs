using Domain.Models.Bookings;

namespace Application.Features.Bookings.DTOs
{
    public class BookingInfoDto
    {
        public BookingDto Booking { get; set; } = null!;
        public IEnumerable<BookingDetailDto> Details { get; set; } = new List<BookingDetailDto>();
        public InvoiceDto? Invoice { get; set; }
    }
}
