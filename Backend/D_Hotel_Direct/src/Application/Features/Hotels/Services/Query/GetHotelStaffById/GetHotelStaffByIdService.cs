using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffById;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetHotelStaffById
{
    public class GetHotelStaffByIdService : IGetHotelStaffByIdService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;

        public GetHotelStaffByIdService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
        }

        public async Task<HotelStaffDto> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var hotelStaff = await _hotelStaffRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<HotelStaffDto>(hotelStaff);
        }
    }
}
