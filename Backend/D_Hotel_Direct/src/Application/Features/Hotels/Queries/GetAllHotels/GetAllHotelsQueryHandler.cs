using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotels
{
    public class GetAllHotelsQueryHandler : IRequestHandler<GetAllHotelsQuery, IEnumerable<HotelDto>>
    {
        private readonly IGetAllHotelsService _getAllHotelsService;

        public GetAllHotelsQueryHandler(IGetAllHotelsService getAllHotelsService)
        {
            _getAllHotelsService = getAllHotelsService;
        }

        public async Task<IEnumerable<HotelDto>> Handle(GetAllHotelsQuery request, CancellationToken cancellationToken)
        {
            return await _getAllHotelsService.GetAllAsync(cancellationToken);
        }
    }
}
