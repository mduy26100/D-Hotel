using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.DeleteRoomUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using RoomUtilityEntity = Domain.Models.Utilities.RoomUtility;

namespace Application.Features.Utilities.Services.Command.RoomUtitlity.DeleteRoomUtility
{
    public class DeleteRoomUtilityService : IDeleteRoomUtilityService
    {
        private readonly IRoomUtilityRepository _roomUtilityRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteRoomUtilityService(IRoomUtilityRepository roomUtilityRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomUtilityRepository = roomUtilityRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(RoomUtilityDto roomUtilityDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomUtilityEntity>(roomUtilityDto);
            _roomUtilityRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
