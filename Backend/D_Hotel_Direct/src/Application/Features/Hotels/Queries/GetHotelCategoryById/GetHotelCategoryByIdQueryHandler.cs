using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelCategoryById
{
    public class GetHotelCategoryByIdQueryHandler : IRequestHandler<GetHotelCategoryByIdQuery, HotelCategoryDto>
    {
        private readonly IGetHotelCategoryByIdService _getHotelCategoryByIdService;

        public GetHotelCategoryByIdQueryHandler(IGetHotelCategoryByIdService getHotelCategoryByIdService)
        {
            _getHotelCategoryByIdService = getHotelCategoryByIdService;
        }

        public async Task<HotelCategoryDto> Handle(GetHotelCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelCategoryByIdService.GetByIdAsync(request.Id, cancellationToken);
        }
    }
}
