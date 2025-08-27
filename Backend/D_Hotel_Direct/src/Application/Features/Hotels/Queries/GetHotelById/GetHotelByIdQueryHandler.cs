using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelById
{
    public class GetHotelByIdQueryHandler : IRequestHandler<GetHotelByIdQuery, HotelDto>
    {
        private readonly IGetHotelByIdService _getHotelByIdService;

        public GetHotelByIdQueryHandler(IGetHotelByIdService getHotelByIdService)
        {
            _getHotelByIdService = getHotelByIdService;
        }

        public async Task<HotelDto> Handle(GetHotelByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelByIdService.GetByIdAsync(request.Id, cancellationToken);
        }
    }
}
