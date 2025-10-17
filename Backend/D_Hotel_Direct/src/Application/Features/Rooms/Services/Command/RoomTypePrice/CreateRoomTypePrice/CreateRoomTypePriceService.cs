using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.CreateRoomTypePrice;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypePriceEntity = Domain.Models.Rooms.RoomTypePrice;

namespace Application.Features.Rooms.Services.Command.RoomTypePrice.CreateRoomTypePrice
{
    public class CreateRoomTypePriceService : ICreateRoomTypePriceService
    {
        private readonly IRoomTypePriceRepository _roomTypePriceRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRoomTypePriceService(IRoomTypePriceRepository roomTypePriceRepository,
            IMapper mapper,
            IApplicationDbContext context)
        {
            _roomTypePriceRepository = roomTypePriceRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RoomTypePriceDto> CreateAsync(RoomTypePriceDto roomTypePriceDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypePriceEntity>(roomTypePriceDto);
            await _roomTypePriceRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<RoomTypePriceDto>(entity);
        }
    }
}
