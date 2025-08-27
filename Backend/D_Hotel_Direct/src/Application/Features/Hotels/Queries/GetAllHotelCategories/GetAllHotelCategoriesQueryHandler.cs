using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelCategories;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotelCategories
{
    public class GetAllHotelCategoriesQueryHandler : IRequestHandler<GetAllHotelCategoriesQuery, IEnumerable<HotelCategoryDto>>
    {
        private readonly IGetAllHotelCategoriesService _getAllHotelCategoriesService;

        public GetAllHotelCategoriesQueryHandler(IGetAllHotelCategoriesService getAllHotelCategoriesService)
        {
            _getAllHotelCategoriesService = getAllHotelCategoriesService;
        }

        public async Task<IEnumerable<HotelCategoryDto>> Handle(GetAllHotelCategoriesQuery request, CancellationToken cancellationToken)
        {
            return await _getAllHotelCategoriesService.GetAllAsync(cancellationToken);
        }
    }
}
