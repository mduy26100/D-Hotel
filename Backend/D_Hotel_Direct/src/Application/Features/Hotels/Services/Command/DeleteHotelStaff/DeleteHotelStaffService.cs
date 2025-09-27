using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelStaff;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.DeleteHotelStaff
{
    public class DeleteHotelStaffService : IDeleteHotelStaffService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteHotelStaffService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(HotelStaffDto dto, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<HotelStaff>(dto);
            _hotelStaffRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}
