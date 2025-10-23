namespace Application.Features.Bookings.DTOs
{
    public class BookingDetailDto
    {
        public int Id { get; set; }
        public int BookingId { get; set; }  // bắt buộc để biết thuộc booking nào

        public string? ItemType { get; set; }    // loại dịch vụ, nullable
        public int? ItemId { get; set; }         // FK đến dịch vụ/food, nullable
        public string? ItemName { get; set; }    // tên dịch vụ, nullable

        public decimal? UnitPrice { get; set; }  // giá 1 đơn vị, nullable
        public int? Quantity { get; set; }       // số lượng, nullable
        public decimal? TotalPrice { get; set; } // tổng giá, nullable
    }
}
