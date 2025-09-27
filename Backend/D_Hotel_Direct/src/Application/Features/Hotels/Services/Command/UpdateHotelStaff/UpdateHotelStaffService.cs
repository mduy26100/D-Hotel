using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelStaff;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.UpdateHotelStaff
{
    public class UpdateHotelStaffService : IUpdateHotelStaffService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateHotelStaffService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(HotelStaffDto dto, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<HotelStaff>(dto);
            _hotelStaffRepository.Update(entity);
            await _context.SaveChangesAsync();
            await Task.CompletedTask;
        }
    }
}
