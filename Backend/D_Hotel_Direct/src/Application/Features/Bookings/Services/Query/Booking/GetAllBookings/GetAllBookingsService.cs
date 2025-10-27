using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetAllBookings;
using Application.Features.Bookings.Repositories;
using Application.Features.Hotels.Repositories;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Services.Query.Booking.GetAllBookings
{
    public class GetAllBookingsService : IGetAllBookingsService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IHotelRepository _hotelRepository;
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;

        public GetAllBookingsService(IBookingRepository bookingRepository
            , IBookingDetailRepository bookingDetailRepository
            , IInvoiceRepository invoiceRepository
            , IHotelRepository hotelRepository
            , IRoomTypeRepository roomTypeRepository
            , IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _hotelRepository = hotelRepository;
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookingDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            // Lấy toàn bộ booking
            var bookings = await _bookingRepository.GetAllAsync(cancellationToken);

            // Lấy danh sách Ids để fetch các dữ liệu liên quan
            var hotelIds = bookings.Select(b => b.HotelId).Distinct().ToList();
            var roomTypeIds = bookings.Select(b => b.RoomTypeId).Distinct().ToList();
            var bookingIds = bookings.Select(b => b.Id).Distinct().ToList();

            // Lấy dữ liệu khách sạn, loại phòng và invoice
            var hotels = await _hotelRepository.FindAsync(h => hotelIds.Contains(h.Id), cancellationToken);
            var roomTypes = await _roomTypeRepository.FindAsync(r => roomTypeIds.Contains(r.Id), cancellationToken);
            var invoices = await _invoiceRepository.FindAsync(i => bookingIds.Contains(i.BookingId), cancellationToken);

            // Map qua DTO
            var bookingDtos = _mapper.Map<IEnumerable<BookingDto>>(bookings).ToList();

            // Gán thông tin liên quan
            foreach (var bookingDto in bookingDtos)
            {
                var hotel = hotels.FirstOrDefault(h => h.Id == bookingDto.HotelId);
                var roomType = roomTypes.FirstOrDefault(r => r.Id == bookingDto.RoomTypeId);
                var invoice = invoices.FirstOrDefault(i => i.BookingId == bookingDto.Id);

                bookingDto.HotelName = hotel?.Name;
                bookingDto.RoomTypeName = roomType?.Name;

                // Gán thông tin invoice nếu có
                if (invoice != null)
                {
                    bookingDto.InvoiceNumber = invoice.InvoiceNumber;
                    bookingDto.PaymentMethod = invoice.PaymentMethod;
                }
            }

            return bookingDtos;
        }
    }
}
