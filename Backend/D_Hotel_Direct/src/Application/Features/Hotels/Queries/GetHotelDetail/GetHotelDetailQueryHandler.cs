using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelDetail;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelDetail
{
    public class GetHotelDetailQueryHandler : IRequestHandler<GetHotelDetailQuery, HotelDetailDto?>
    {
        private readonly IGetHotelDetailService _getHotelDetailService;

        public GetHotelDetailQueryHandler(IGetHotelDetailService getHotelDetailService)
        {
            _getHotelDetailService = getHotelDetailService;
        }

        public async Task<HotelDetailDto?> Handle(GetHotelDetailQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelDetailService.GetHotelDetailAsync(request.Id, cancellationToken);
        }
    }
}
