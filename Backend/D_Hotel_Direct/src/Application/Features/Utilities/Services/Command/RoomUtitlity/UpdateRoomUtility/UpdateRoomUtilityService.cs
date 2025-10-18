using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.UpdateRoomUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using RoomUtilityEntity = Domain.Models.Utilities.RoomUtility;

namespace Application.Features.Utilities.Services.Command.RoomUtitlity.UpdateRoomUtility
{
    public class UpdateRoomUtilityService : IUpdateRoomUtilityService
    {
        private readonly IRoomUtilityRepository _roomUtilityRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateRoomUtilityService(IRoomUtilityRepository roomUtilityRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomUtilityRepository = roomUtilityRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(RoomUtilityDto roomUtilityDto, CancellationToken cancellationToken = default)
        {
            var existingUtilities = await _roomUtilityRepository.FindAsync(h => h.RoomId == roomUtilityDto.RoomId, cancellationToken);
            foreach (var utility in existingUtilities)
            {
                _roomUtilityRepository.Remove(utility);
            }

            foreach (var utilityId in roomUtilityDto.UtilityIds.Distinct())
            {
                var hotelUtility = new RoomUtilityEntity
                {
                    RoomId = roomUtilityDto.RoomId,
                    UtilityId = utilityId
                };
                await _roomUtilityRepository.AddAsync(hotelUtility, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
