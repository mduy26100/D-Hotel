using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetRoomPurposeById;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId;
using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetBedTypeById;
using Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetQuantityGuestById;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeDetailById;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using Application.Features.Rooms.Repositories;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByRoomId;
using AutoMapper;

namespace Application.Features.Rooms.Services.Query.RoomType.GetRoomTypeDetailById
{
    public class GetRoomTypeDetailByIdService : IGetRoomTypeDetailByIdService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IRoomTypePriceRepository _roomTypePriceRepository;
        private readonly IGetRoomImagesByRoomTypeIdService _getRoomImagesByRoomTypeIdService;
        private readonly IGetUtilityByRoomIdService _getUtilityByRoomIdService;
        private readonly IGetRoomPurposeByRoomIdService _getRoomPurposeByRoomIdService;
        private readonly IGetRoomPurposeByIdService _getRoomPurposeByIdService;
        private readonly IGetBedTypeByIdService _getBedTypeByIdService;
        private readonly IGetQuantityGuestByIdService _getQuantityGuestByIdService;
        private readonly IMapper _mapper;

        public GetRoomTypeDetailByIdService(
            IRoomTypeRepository roomTypeRepository,
            IMapper mapper,
            IRoomTypePriceRepository roomTypePriceRepository,
            IGetRoomImagesByRoomTypeIdService getRoomImagesByRoomTypeIdService,
            IGetUtilityByRoomIdService getUtilityByRoomIdService,
            IGetRoomPurposeByRoomIdService getRoomPurposeByRoomIdService,
            IGetRoomPurposeByIdService getRoomPurposeByIdService,
            IGetBedTypeByIdService getBedTypeByIdService,
            IGetQuantityGuestByIdService getQuantityGuestByIdService)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
            _roomTypePriceRepository = roomTypePriceRepository;
            _getRoomImagesByRoomTypeIdService = getRoomImagesByRoomTypeIdService;
            _getUtilityByRoomIdService = getUtilityByRoomIdService;
            _getRoomPurposeByRoomIdService = getRoomPurposeByRoomIdService;
            _getRoomPurposeByIdService = getRoomPurposeByIdService;
            _getBedTypeByIdService = getBedTypeByIdService;
            _getQuantityGuestByIdService = getQuantityGuestByIdService;
        }

        public async Task<RoomTypeDetailDto?> GetRoomTypeDetail(int roomTypeId, CancellationToken cancellationToken = default)
        {
            var roomType = await _roomTypeRepository.GetByIdAsync(roomTypeId);
            if (roomType == null)
                return null;

            var currentDate = DateTime.UtcNow;

            // 🔹 Tìm giá đang có hiệu lực (nếu có)
            var currentPrice = await _roomTypePriceRepository.FindOneAsync(p =>
                p.RoomTypeId == roomType.Id &&
                p.IsActive &&
                currentDate >= p.StartDate &&
                currentDate <= p.EndDate);

            // 🔹 Load thông tin phụ
            var quantityGuestDto = await _getQuantityGuestByIdService.GetByIdAsync(roomType.QuantityGuestId, cancellationToken);
            var bedTypeDto = await _getBedTypeByIdService.GetByIdAsync(roomType.BedTypeId, cancellationToken);
            var roomImages = await _getRoomImagesByRoomTypeIdService.GetByRoomTypeIdAsync(roomType.Id, cancellationToken);
            var roomUtilities = await _getUtilityByRoomIdService.GetByIdAsync(roomType.Id, cancellationToken);
            var utilityDtos = roomUtilities.FirstOrDefault()?.Utilities ?? new List<UtilityDto>();

            // 🔹 Lấy RoomPurpose (nếu có)
            var roomPurposes = await _getRoomPurposeByRoomIdService.GetRoomPurposeByRoomId(roomType.Id, cancellationToken);
            var roomPurpose = roomPurposes != null
                ? await _getRoomPurposeByIdService.GetByIdAsync(roomPurposes.RoomPurposeId, cancellationToken)
                : null;

            var roomPurposeDto = roomPurpose != null
                ? new RoomPurposeDto
                {
                    Id = roomPurpose.Id,
                    Name = roomPurpose.Name
                }
                : null;

            // 🔹 Gộp giá (ưu tiên lấy giá theo thời gian nếu có)
            var dto = new RoomTypeDetailDto
            {
                Id = roomType.Id,
                HotelId = roomType.HotelId,
                Name = roomType.Name,
                Description = roomType.Description,
                Area = roomType.Area,
                Quantity = roomType.Quantity,
                IsActive = roomType.IsActive,

                // --- Giá thuê (ưu tiên RoomTypePrice nếu có) ---
                BaseHourlyPrice = currentPrice?.BaseHourlyPrice ?? roomType.BaseHourlyPrice,
                ExtraHourPrice = currentPrice?.ExtraHourPrice ?? roomType.ExtraHourPrice,
                OvernightPrice = currentPrice?.OvernightPrice ?? roomType.OvernightPrice,
                DailyPrice = currentPrice?.DailyPrice ?? roomType.DailyPrice,

                // --- Thời gian & giới hạn (chỉ lấy từ RoomType) ---
                BaseHours = roomType.BaseHours,
                MaxHours = roomType.MaxHours,
                OvernightStartTime = roomType.OvernightStartTime,
                OvernightEndTime = roomType.OvernightEndTime,
                DailyStartTime = roomType.DailyStartTime,
                DailyEndTime = roomType.DailyEndTime,

                // --- Liên kết dữ liệu ---
                QuantityGuest = quantityGuestDto,
                BedType = bedTypeDto,
                RoomImages = roomImages,
                Utilities = utilityDtos,
                RoomPurpose = roomPurposeDto,
                RoomTypePrice = currentPrice != null ? _mapper.Map<RoomTypePriceDto>(currentPrice) : null
            };

            return dto;
        }
    }
}
