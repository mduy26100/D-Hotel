using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelCategory;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotelCategory
{
    public class CreateHotelCategoryCommandHandler : IRequestHandler<CreateHotelCategoryCommand, HotelCategoryDto>
    {
        private readonly ICreateHotelCategoryService _createHotelCategoryService;

        public CreateHotelCategoryCommandHandler(ICreateHotelCategoryService createHotelCategoryService)
        {
            _createHotelCategoryService = createHotelCategoryService;
        }

        public async Task<HotelCategoryDto> Handle(CreateHotelCategoryCommand request, CancellationToken cancellationToken)
        {
            return await _createHotelCategoryService.CreateAsync(request.Dto, cancellationToken);
        }
    }
}
