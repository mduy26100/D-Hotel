using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotel;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotel
{
    public class CreateHotelCommandHandler : IRequestHandler<CreateHotelCommand, HotelDto>
    {
        private readonly ICreateHotelService _createHotelService;

        public CreateHotelCommandHandler(ICreateHotelService createHotelService)
        {
            _createHotelService = createHotelService;
        }

        public async Task<HotelDto> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
        {
            var dto = new UpsertHotelRequest
            {
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

            return await _createHotelService.CreateAsync(dto, cancellationToken);
        }
    }
}
