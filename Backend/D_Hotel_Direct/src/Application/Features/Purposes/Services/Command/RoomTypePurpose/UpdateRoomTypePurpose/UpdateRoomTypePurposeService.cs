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
            var oldEntity = await _roomTypePurposeRepository
                .FindOneAsync(rtp => rtp.RoomId == roomTypePurposeDto.RoomId, cancellationToken);

            if (oldEntity != null)
            {
                _roomTypePurposeRepository.Remove(oldEntity);

                var newEntity = new RoomTypePurposeEnity
                {
                    RoomId = roomTypePurposeDto.RoomId,
                    RoomPurposeId = roomTypePurposeDto.RoomPurposeId
                };
                await _roomTypePurposeRepository.AddAsync(newEntity);

                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
