using Application.Features.Purposes.DTOs;
using Application.Features.Utilities.DTOs;

namespace Application.Features.Rooms.DTOs
{
    public class RoomTypeDetailDto
    {
        public int Id { get; set; }
        public int HotelId { get; set; }

        public required string Name { get; set; }
        public required string Description { get; set; }

        public decimal BasePrice { get; set; }

        public required string Area { get; set; }

        public QuantityGuestDto? QuantityGuest { get; set; }
        public BedTypeDto? BedType { get; set; }

        public int Quantity { get; set; }

        public bool IsActive { get; set; }

        public IEnumerable<RoomTypeImageDto>? RoomImages { get; set; } = new List<RoomTypeImageDto>();
        public IEnumerable<UtilityDto> Utilities { get; set; } = new List<UtilityDto>();
        public RoomPurposeDto? RoomPurpose { get; set; }
        public RoomTypePriceDto? RoomTypePrice { get; set; }
    }
}
