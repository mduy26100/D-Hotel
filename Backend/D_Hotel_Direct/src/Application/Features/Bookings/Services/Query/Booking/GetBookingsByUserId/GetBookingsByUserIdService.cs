using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId;
using Application.Features.Bookings.Repositories;
using Application.Features.Hotels.Repositories;
using Application.Features.Rooms.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingsByUserId
{
    public class GetBookingsByUserIdService : IGetBookingsByUserIdService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IHotelRepository _hotelRepository;
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetBookingsByUserIdService(
            IBookingRepository bookingRepository,
            IHotelRepository hotelRepository,
            IRoomTypeRepository roomTypeRepository,
            IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _hotelRepository = hotelRepository;
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookingDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var bookings = (await _bookingRepository.FindAsync(h => h.UserId == userId, cancellationToken)).ToList();

            if (!bookings.Any())
                return Enumerable.Empty<BookingDto>();

            // Lấy toàn bộ danh sách hotelId và roomTypeId
            var hotelIds = bookings.Select(b => b.HotelId).Distinct().ToList();
            var roomTypeIds = bookings.Select(b => b.RoomTypeId).Distinct().ToList();

            // Lấy dữ liệu khách sạn và loại phòng
            var hotels = await _hotelRepository.FindAsync(h => hotelIds.Contains(h.Id), cancellationToken);
            var roomTypes = await _roomTypeRepository.FindAsync(r => roomTypeIds.Contains(r.Id), cancellationToken);

            // Map qua DTO
            var bookingDtos = _mapper.Map<IEnumerable<BookingDto>>(bookings).ToList();

            // Gán thêm tên khách sạn và loại phòng
            foreach (var bookingDto in bookingDtos)
            {
                var hotel = hotels.FirstOrDefault(h => h.Id == bookingDto.HotelId);
                var roomType = roomTypes.FirstOrDefault(r => r.Id == bookingDto.RoomTypeId);

                bookingDto.HotelName = hotel?.Name;
                bookingDto.RoomTypeName = roomType?.Name;
            }

            return bookingDtos;
        }
    }
}
