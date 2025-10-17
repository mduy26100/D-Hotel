namespace Application.Features.Rooms.DTOs
{
    public class QuantityGuestDto
    {
        public int Id { get; set; }

        public required string Name { get; set; }       // Ví dụ: "2 Adults + 1 Child"
        public int MinGuests { get; set; }
        public int MaxGuests { get; set; }
        public int StandardGuests { get; set; }
        public decimal? ExtraGuestCharge { get; set; }  // Phụ phí thêm mỗi khách vượt chuẩn

        public bool ChildrenAllowed { get; set; }
        public int? MaxChildren { get; set; }
    }
}
