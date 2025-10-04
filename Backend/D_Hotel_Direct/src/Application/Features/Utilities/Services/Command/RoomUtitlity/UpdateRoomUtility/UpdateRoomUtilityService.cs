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
            var entity = _mapper.Map<RoomUtilityEntity>(roomUtilityDto);
            _roomUtilityRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
