using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.UpdateBooking;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Command.UpdateBooking
{
    public class UpdateBookingService : IUpdateBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateBookingService(
            IBookingRepository bookingRepository,
            IApplicationDbContext context,
            IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _context = context;
            _mapper = mapper;
        }

        public async Task UpdateAsync(int bookingId, BookingAggregateDto updatedBooking, CancellationToken cancellationToken = default)
        {
            // --- Lấy Booking ---
            var bookingEntity = await _bookingRepository.GetByIdAsync(bookingId, cancellationToken)
                ?? throw new Exception($"Booking {bookingId} not found");

            // --- Cập nhật Booking ---
            _mapper.Map(updatedBooking.Booking, bookingEntity);

            _bookingRepository.Update(bookingEntity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
