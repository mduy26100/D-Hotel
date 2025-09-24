namespace Domain.Models.Hotels
{
    public class HotelStaff
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }

        public int HotelId { get; set; }

        public bool IsActive { get; set; }
    }
}
