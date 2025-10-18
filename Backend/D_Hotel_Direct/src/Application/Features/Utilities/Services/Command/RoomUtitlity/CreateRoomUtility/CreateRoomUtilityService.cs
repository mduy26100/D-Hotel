using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.CreateRoomUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using RoomUtilityEntity = Domain.Models.Utilities.RoomUtility;

namespace Application.Features.Utilities.Services.Command.RoomUtitlity.CreateRoomUtility
{
    public class CreateRoomUtilityService : ICreateRoomUtilityService
    {
        private readonly IRoomUtilityRepository _roomUtilityRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRoomUtilityService(IRoomUtilityRepository roomUtilityRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomUtilityRepository = roomUtilityRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RoomUtilityDto> CreateAsync(RoomUtilityDto roomUtilityDto, CancellationToken cancellationToken = default)
        {
            foreach (var item in roomUtilityDto.UtilityIds)
            {
                var roomUtility = new RoomUtilityEntity
                {
                    RoomId = roomUtilityDto.RoomId,
                    UtilityId = item
                };
                await _roomUtilityRepository.AddAsync(roomUtility, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);
            return roomUtilityDto;
        }
    }
}
