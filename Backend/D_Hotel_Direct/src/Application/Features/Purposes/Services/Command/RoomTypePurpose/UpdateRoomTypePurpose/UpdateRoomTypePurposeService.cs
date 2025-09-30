using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.UpdateRoomTypePurpose;
using Application.Features.Purposes.Repositories;
using AutoMapper;
using RoomTypePurposeEnity = Domain.Models.Purposes.RoomTypePurpose;

namespace Application.Features.Purposes.Services.Command.RoomTypePurpose.UpdateRoomTypePurpose
{
    public class UpdateRoomTypePurposeService : IUpdateRoomTypePurposeService
    {
        private readonly IRoomTypePurposeRepository _roomTypePurposeRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateRoomTypePurposeService(IRoomTypePurposeRepository roomTypePurposeRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypePurposeRepository = roomTypePurposeRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(RoomTypePurposeDto roomTypePurposeDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<RoomTypePurposeEnity>(roomTypePurposeDto);
            _roomTypePurposeRepository.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
