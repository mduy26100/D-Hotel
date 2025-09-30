using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.DeleteHotelTravelPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using HotelTravelPurposeEntity = Domain.Models.Purposes.HotelTravelPurpose;

namespace Application.Features.Purposes.Services.Command.HotelTravelPurpose.DeleteHotelTravelPurpose
{
    public class DeleteHotelTravelPurposeService : IDeleteHotelTravelPurposeService
    {
        private readonly IHotelTravelPurposeRepository _hotelTravelPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteHotelTravelPurposeService(IHotelTravelPurposeRepository hotelTravelPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelTravelPurposeRepository = hotelTravelPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(HotelTravelPurposeDto hotelTravelPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelTravelPurposeEntity>(hotelTravelPurposeDto);
            _hotelTravelPurposeRepository.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
