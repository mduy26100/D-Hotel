using Application.Features.Purposes.DTOs;
using Application.Features.Utilities.DTOs;

namespace Application.Features.Rooms.DTOs
{
    public class RoomTypeDetailDto
    {
        public int Id { get; set; }
        public int HotelId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // --- Giá gốc (mặc định từ RoomType) ---
        public decimal? BaseHourlyPrice { get; set; }
        public int? BaseHours { get; set; }
        public decimal? ExtraHourPrice { get; set; }
        public int? MaxHours { get; set; }

        public decimal? OvernightPrice { get; set; }
        public TimeSpan? OvernightStartTime { get; set; }
        public TimeSpan? OvernightEndTime { get; set; }

        public decimal? DailyPrice { get; set; }
        public TimeSpan? DailyStartTime { get; set; }
        public TimeSpan? DailyEndTime { get; set; }

        public string Area { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public bool IsActive { get; set; }

        public QuantityGuestDto? QuantityGuest { get; set; }
        public BedTypeDto? BedType { get; set; }
        public IEnumerable<RoomTypeImageDto>? RoomImages { get; set; } = new List<RoomTypeImageDto>();
        public IEnumerable<UtilityDto> Utilities { get; set; } = new List<UtilityDto>();
        public RoomPurposeDto? RoomPurpose { get; set; }
        public RoomTypePriceDto? RoomTypePrice { get; set; }
    }
}
