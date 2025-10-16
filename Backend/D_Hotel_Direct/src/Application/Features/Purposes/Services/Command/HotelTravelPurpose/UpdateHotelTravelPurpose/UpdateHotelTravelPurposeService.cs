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

            var oldEntity = await _hotelTravelPurposeRepository
                .FindOneAsync(rtp => rtp.HotelId == hotelTravelPurposeDto.HotelId, cancellationToken);

            if (oldEntity != null)
            {
                _hotelTravelPurposeRepository.Remove(oldEntity);

                var newEntity = new HotelTravelPurposeEntity
                {
                    HotelId = hotelTravelPurposeDto.HotelId,
                    TravelPurposeId = hotelTravelPurposeDto.TravelPurposeId
                };
                await _hotelTravelPurposeRepository.AddAsync(newEntity);

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
