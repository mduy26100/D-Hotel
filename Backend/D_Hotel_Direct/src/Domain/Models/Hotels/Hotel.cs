namespace Domain.Models.Hotels
{
    public class Hotel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int CategoryId { get; set; }
        public Guid HotelManagerId { get; set; }
        public required string Address { get; set; }
        public required string Description { get; set; }
        public required string ImgUrl { get; set; }
        public bool IsActive { get; set; }
    }
}
