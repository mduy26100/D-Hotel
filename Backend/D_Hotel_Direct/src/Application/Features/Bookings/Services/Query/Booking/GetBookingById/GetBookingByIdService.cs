using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingById;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingById
{
    public class GetBookingByIdService : IGetBookingByIdService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;

        public GetBookingByIdService(IBookingRepository bookingRepository
            , IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        public async Task<BookingDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _bookingRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<BookingDto>(entity);
        }
    }
}
