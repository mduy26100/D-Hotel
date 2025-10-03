using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsById;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.BookingDetail.GetBookingDetailsById
{
    public class GetBookingDetailsByIdService : IGetBookingDetailsByIdService
    {
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IMapper _mapper;

        public GetBookingDetailsByIdService(IBookingDetailRepository bookingDetailRepository
            , IMapper mapper)
        {
            _bookingDetailRepository = bookingDetailRepository;
            _mapper = mapper;
        }

        public async Task<BookingDetailDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var bookingDetail = await _bookingDetailRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<BookingDetailDto>(bookingDetail);
        }
    }
}
