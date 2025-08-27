using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotel;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.DeleteHotel
{
    public class DeleteHotelService : IDeleteHotelService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteHotelService(IHotelRepository hotelRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelRepository = hotelRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(HotelDto hotelDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<Hotel>(hotelDto);
            _hotelRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}
