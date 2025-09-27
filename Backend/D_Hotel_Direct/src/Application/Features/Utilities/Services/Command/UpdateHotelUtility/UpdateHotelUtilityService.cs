using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateHotelUtility;
using Application.Features.Utilities.Repositories;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.UpdateHotelUtility
{
    public class UpdateHotelUtilityService : IUpdateHotelUtilityService
    {
        private readonly IHotelUtilityRepository _hotelUtilityRepository;
        private readonly IApplicationDbContext _context;

        public UpdateHotelUtilityService(IHotelUtilityRepository hotelUtilityRepository
            , IApplicationDbContext context)
        {
            _hotelUtilityRepository = hotelUtilityRepository;
            _context = context;
        }

        public async Task UpdateAsync(HotelUtilityDto request, CancellationToken cancellationToken = default)
        {
            // 1. Xoá toàn bộ utility cũ
            var existingUtilities = await _hotelUtilityRepository.FindAsync(h => h.HotelId == request.HotelId, cancellationToken);
            foreach (var utility in existingUtilities)
            {
                _hotelUtilityRepository.Remove(utility);
            }

            // 2. Thêm lại utility mới
            foreach (var utilityId in request.UtilityIds.Distinct())
            {
                var hotelUtility = new HotelUtility
                {
                    HotelId = request.HotelId,
                    UtilityId = utilityId
                };
                await _hotelUtilityRepository.AddAsync(hotelUtility, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
