using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.UpdateHotelTravelPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using HotelTravelPurposeEntity = Domain.Models.Purposes.HotelTravelPurpose;

namespace Application.Features.Purposes.Services.Command.HotelTravelPurpose.UpdateHotelTravelPurpose
{
    public class UpdateHotelTravelPurposeService : IUpdateHotelTravelPurposeService
    {
        private readonly IHotelTravelPurposeRepository _hotelTravelPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateHotelTravelPurposeService(IHotelTravelPurposeRepository hotelTravelPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelTravelPurposeRepository = hotelTravelPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(HotelTravelPurposeDto hotelTravelPurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelTravelPurposeEntity>(hotelTravelPurposeDto);
            _hotelTravelPurposeRepository.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
