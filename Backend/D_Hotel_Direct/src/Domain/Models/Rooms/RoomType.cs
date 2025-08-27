namespace Domain.Models.Rooms
{
    public class RoomType
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public required string Area { get; set; }
        public int QuantityGuestId { get; set; }
        public int BedTypeId { get; set; }
        public int Quantity { get; set; }
        public bool IsActive { get; set; }
    }
}
