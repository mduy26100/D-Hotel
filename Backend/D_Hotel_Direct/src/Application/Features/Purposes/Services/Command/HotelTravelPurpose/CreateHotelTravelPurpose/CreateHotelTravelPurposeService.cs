using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.CreateHotelTravelPurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using HotelTravelPurposeEntity = Domain.Models.Purposes.HotelTravelPurpose;

namespace Application.Features.Purposes.Services.Command.HotelTravelPurpose.CreateHotelTravelPurpose
{
    public class CreateHotelTravelPurposeService : ICreateHotelTravelPurposeService
    {
        private readonly IHotelTravelPurposeRepository _hotelTravelPurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateHotelTravelPurposeService(IHotelTravelPurposeRepository hotelTravelPurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelTravelPurposeRepository = hotelTravelPurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<HotelTravelPurposeDto> CreateAsync(HotelTravelPurposeDto hotelTravelPurpose, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelTravelPurposeEntity>(hotelTravelPurpose);
            await _hotelTravelPurposeRepository.AddAsync(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<HotelTravelPurposeDto>(entity);
        }
    }
}
