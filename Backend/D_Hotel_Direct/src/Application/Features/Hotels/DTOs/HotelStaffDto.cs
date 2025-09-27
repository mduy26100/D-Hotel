namespace Application.Features.Hotels.DTOs
{
    public class HotelStaffDto
    {
        public int Id { get; set; }

        public Guid UserId { get; set; }

        public int HotelId { get; set; }

        public bool IsActive { get; set; }
    }
}
