using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelsByCategoryId
{
    public class GetHotelsByCategoryIdQueryHandler : IRequestHandler<GetHotelsByCategoryIdQuery, IEnumerable<HotelDto>>
    {
        private readonly IGetHotelsByCategoryIdService _getHotelsByCategoryIdService;

        public GetHotelsByCategoryIdQueryHandler(IGetHotelsByCategoryIdService getHotelsByCategoryIdService)
        {
            _getHotelsByCategoryIdService = getHotelsByCategoryIdService;
        }

        public async Task<IEnumerable<HotelDto>> Handle(GetHotelsByCategoryIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelsByCategoryIdService.GetHotelsByCategoryIdAsync(request.CategoryId, cancellationToken);
        }
    }
}
