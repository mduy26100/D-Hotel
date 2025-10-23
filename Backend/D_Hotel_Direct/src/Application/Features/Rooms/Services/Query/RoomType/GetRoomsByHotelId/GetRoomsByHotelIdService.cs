using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomsByHotelId;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Consts;

namespace Application.Features.Rooms.Services.Query.RoomType.GetRoomsByHotelId
{
    public class GetRoomsByHotelIdService : IGetRoomsByHotelIdService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetRoomsByHotelIdService(
            IRoomTypeRepository roomTypeRepository,
            IMapper mapper)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoomTypeDto>> GetRoomsByHotelId(
            int hotelId,
            string? priceType = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TimeSpan? checkInTime = null,
            int? usageHours = null,
            CancellationToken cancellationToken = default)
        {
            var roomTypes = await _roomTypeRepository.FindAsync(
                rt => rt.HotelId == hotelId && rt.IsActive,
                cancellationToken);

            var roomTypeDtos = _mapper.Map<IEnumerable<RoomTypeDto>>(roomTypes);

            foreach (var dto in roomTypeDtos)
            {
                dto.DisplayPrice = priceType?.ToLower() switch
                {
                    PriceType.Hourly => CalculateHourlyPrice(dto, usageHours),
                    PriceType.Overnight => CalculateOvernightPrice(dto),
                    PriceType.Daily => CalculateDailyPrice(dto, startDate, endDate),
                    _ => dto.DailyPrice ?? 0
                };

                switch (priceType?.ToLower())
                {
                    case PriceType.Hourly:
                        dto.DisplayType = "Hourly";
                        if (checkInTime.HasValue && usageHours.HasValue)
                        {
                            dto.DisplayStartTime = checkInTime;

                            // Tính DisplayEndTime theo vòng 24h
                            var totalHours = checkInTime.Value.TotalHours + usageHours.Value;
                            var endHour = totalHours % 24; // vòng 24h
                            dto.DisplayEndTime = TimeSpan.FromHours(endHour);

                            // Tính DisplayEndDate nếu vượt qua nửa đêm
                            dto.DisplayStartDate = startDate;
                            dto.DisplayEndDate = totalHours > 24
                                ? startDate?.AddDays(1)
                                : startDate;
                        }
                        else
                        {
                            dto.DisplayStartTime = TimeSpan.Zero;
                            dto.DisplayEndTime = TimeSpan.Zero;
                            dto.DisplayStartDate = startDate ?? DateTime.Today;
                            dto.DisplayEndDate = dto.DisplayStartDate;
                        }
                        break;

                    case PriceType.Overnight:
                        dto.DisplayType = "Overnight";
                        dto.DisplayStartTime = dto.OvernightStartTime;
                        dto.DisplayEndTime = dto.OvernightEndTime;
                        dto.DisplayStartDate = startDate ?? DateTime.Today;
                        dto.DisplayEndDate = (startDate ?? DateTime.Today).AddDays(1);
                        break;

                    case PriceType.Daily:
                    default:
                        dto.DisplayType = "Daily";
                        dto.DisplayStartTime = dto.DailyStartTime;
                        dto.DisplayEndTime = dto.DailyEndTime;
                        dto.DisplayStartDate = startDate ?? DateTime.Today;
                        dto.DisplayEndDate = endDate ?? dto.DisplayStartDate;
                        break;
                }
            }


            return roomTypeDtos;
        }

        // 🕓 Theo giờ
        private decimal CalculateHourlyPrice(RoomTypeDto room, int? usageHours)
        {
            if (room.BaseHourlyPrice == null || room.ExtraHourPrice == null)
                return 0;

            var baseHours = room.BaseHours ?? 0;
            var maxHours = room.MaxHours ?? int.MaxValue;

            var totalHours = usageHours ?? baseHours;
            if (totalHours < baseHours)
                totalHours = baseHours;
            if (totalHours > maxHours)
                totalHours = maxHours;

            var extraHours = totalHours - baseHours;
            var totalPrice = room.BaseHourlyPrice.Value + (extraHours * room.ExtraHourPrice.Value);
            return totalPrice;
        }

        // 🌙 Qua đêm
        private decimal CalculateOvernightPrice(RoomTypeDto room)
        {
            return room.OvernightPrice ?? 0;
        }

        // ☀️ Theo ngày
        private decimal CalculateDailyPrice(RoomTypeDto room, DateTime? startDate, DateTime? endDate)
        {
            if (room.DailyPrice == null)
                return 0;

            if (startDate == null || endDate == null || endDate <= startDate)
                return room.DailyPrice.Value;

            var totalDays = (endDate.Value.Date - startDate.Value.Date).Days;
            if (totalDays <= 0)
                totalDays = 1;

            return room.DailyPrice.Value * totalDays;
        }
    }
}
