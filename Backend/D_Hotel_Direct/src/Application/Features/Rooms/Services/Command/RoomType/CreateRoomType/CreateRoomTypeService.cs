using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.CreateRoomType;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypeEntity = Domain.Models.Rooms.RoomType;

namespace Application.Features.Rooms.Services.Command.RoomType.CreateRoomType
{
    public class CreateRoomTypeService : ICreateRoomTypeService
    {
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRoomTypeService(IRoomTypeRepository roomTypeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeRepository = roomTypeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RoomTypeDto> CreateAsync(RoomTypeDto dto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypeEntity>(dto);
            await _roomTypeRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<RoomTypeDto>(entity);
        }
    }
}
