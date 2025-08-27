using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotel;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotel
{
    public class UpdateHotelCommandHandler : IRequestHandler<UpdateHotelCommand, Unit>
    {
        private readonly IUpdateHotelService _updateHotelService;

        public UpdateHotelCommandHandler(IUpdateHotelService updateHotelService)
        {
            _updateHotelService = updateHotelService;
        }

        public async Task<Unit> Handle(UpdateHotelCommand request, CancellationToken cancellationToken)
        {
            var updateRequest = new DTOs.UpsertHotelRequest
            {
                Id = request.dto.Id,
                Name = request.dto.Name,
                CategoryId = request.dto.CategoryId,
                HotelManagerId = request.dto.HotelManagerId,
                Address = request.dto.Address,
                Description = request.dto.Description,
                IsActive = request.dto.IsActive,
                ImgContent = request.ImageContent,
                ImgFileName = request.ImageFileName,
                ImgContentType = request.ImageContentType
            };

            await _updateHotelService.UpdateAsync(updateRequest, cancellationToken);
            return Unit.Value;
        }
    }
}
