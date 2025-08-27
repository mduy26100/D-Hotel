using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateHotelUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.CreateHotelUtility
{
    public class CreateHotelUtilityService : ICreateHotelUtilityService
    {
        private readonly IHotelUtilityRepository _hotelUtilityRepository;
        private readonly IApplicationDbContext _context;

        public CreateHotelUtilityService(IHotelUtilityRepository hotelUtilityRepository
            , IApplicationDbContext context)
        {
            _hotelUtilityRepository = hotelUtilityRepository;
            _context = context;
        }

        public async Task<HotelUtilityDto> CreateAsync(HotelUtilityDto request, CancellationToken cancellationToken = default)
        {
            foreach(var item in request.UtilityIds)
            {
                var hotelUtility = new HotelUtility
                {
                    HotelId = request.HotelId,
                    UtilityId = item
                };
                await _hotelUtilityRepository.AddAsync(hotelUtility, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return request;
        }
    }
}
