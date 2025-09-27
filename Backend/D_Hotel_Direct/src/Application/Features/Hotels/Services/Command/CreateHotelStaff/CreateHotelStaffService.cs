using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelStaff;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.CreateHotelStaff
{
    public class CreateHotelStaffService : ICreateHotelStaffService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateHotelStaffService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<HotelStaffDto> CreateAsync(HotelStaffDto hotelStaffDto, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<HotelStaff>(hotelStaffDto);
            await _hotelStaffRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<HotelStaffDto>(entity);
        }
    }
}
