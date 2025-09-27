using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteHotelUtility;
using Application.Features.Utilities.Repositories;

namespace Application.Features.Utilities.Services.Command.DeleteHotelUtility
{
    public class DeleteHotelUtilityService : IDeleteHotelUtilityService
    {
        private readonly IHotelUtilityRepository _hotelUtilityRepository;
        private readonly IApplicationDbContext _context;

        public DeleteHotelUtilityService(IHotelUtilityRepository hotelUtilityRepository
            , IApplicationDbContext context)
        {
            _hotelUtilityRepository = hotelUtilityRepository;
            _context = context;
        }

        public async Task DeleteAsync(HotelUtilityDto request, CancellationToken cancellationToken = default)
        {
            var existingUtilities = await _hotelUtilityRepository.FindAsync( h => h.HotelId == request.HotelId, cancellationToken);

            foreach (var utility in existingUtilities.Where(u => request.UtilityIds.Contains(u.UtilityId)))
            {
                _hotelUtilityRepository.Remove(utility);
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
