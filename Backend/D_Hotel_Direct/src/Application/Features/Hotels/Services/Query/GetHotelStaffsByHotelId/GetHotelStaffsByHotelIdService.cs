using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffsByHotelId;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetHotelStaffsByHotelId
{
    public class GetHotelStaffsByHotelIdService : IGetHotelStaffsByHotelIdService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;

        public GetHotelStaffsByHotelIdService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelStaffDto>> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken)
        {
            var hotelStaffs = await _hotelStaffRepository.GetStaffsByHotelIdAsync(hotelId, cancellationToken);
            return _mapper.Map<IEnumerable<HotelStaffDto>>(hotelStaffs);
        }
    }
}
