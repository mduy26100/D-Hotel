using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelStaffs;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetAllHotelStaffs
{
    public class GetAllHotelStaffsService : IGetAllHotelStaffsService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;

        public GetAllHotelStaffsService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelStaffDto>> GetAllAsync(CancellationToken cancellationToken)
        {
            var hotelStaffs = await _hotelStaffRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<HotelStaffDto>>(hotelStaffs);
        }
    }
}
