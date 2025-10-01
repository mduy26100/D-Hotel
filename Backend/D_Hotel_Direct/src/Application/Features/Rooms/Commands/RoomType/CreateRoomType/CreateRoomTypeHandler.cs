using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomType.CreateRoomType;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomType.CreateRoomType
{
    public class CreateRoomTypeHandler : IRequestHandler<CreateRoomTypeCommand, RoomTypeDto>
    {
        private readonly ICreateRoomTypeService _createRoomTypeService;

        public CreateRoomTypeHandler(ICreateRoomTypeService createRoomTypeService)
        {
            _createRoomTypeService = createRoomTypeService;
        }

        public async Task<RoomTypeDto> Handle(CreateRoomTypeCommand request, CancellationToken cancellationToken)
        {
            return await _createRoomTypeService.CreateAsync(request.dto, cancellationToken);
        }
    }
}
