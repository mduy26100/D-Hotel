using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.DeleteRoomTypePrice;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypePriceEntity = Domain.Models.Rooms.RoomTypePrice;

namespace Application.Features.Rooms.Services.Command.RoomTypePrice.DeleteRoomTypePrice
{
    public class DeleteRoomTypePriceService : IDeleteRoomTypePriceService
    {
        private readonly IRoomTypePriceRepository _roomTypePriceRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteRoomTypePriceService(IRoomTypePriceRepository roomTypePriceRepository,
            IMapper mapper,
            IApplicationDbContext context)
        {
            _roomTypePriceRepository = roomTypePriceRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task DeleteAsync(RoomTypePriceDto roomTypePriceDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypePriceEntity>(roomTypePriceDto);
            _roomTypePriceRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
