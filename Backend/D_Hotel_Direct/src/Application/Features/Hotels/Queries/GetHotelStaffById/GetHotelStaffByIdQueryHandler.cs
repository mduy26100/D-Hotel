using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelStaffById
{
    public class GetHotelStaffByIdQueryHandler : IRequestHandler<GetHotelStaffByIdQuery, HotelStaffDto>
    {
        private readonly IGetHotelStaffByIdService _getHotelStaffByIdService;

        public GetHotelStaffByIdQueryHandler(IGetHotelStaffByIdService getHotelStaffByIdService)
        {
            _getHotelStaffByIdService = getHotelStaffByIdService;
        }

        public async Task<HotelStaffDto> Handle(GetHotelStaffByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelStaffByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
