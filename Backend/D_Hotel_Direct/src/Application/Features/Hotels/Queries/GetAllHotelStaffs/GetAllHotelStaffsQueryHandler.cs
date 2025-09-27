using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelStaffs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotelStaffs
{
    public class GetAllHotelStaffsQueryHandler : IRequestHandler<GetAllHotelStaffsQuery, IEnumerable<HotelStaffDto>>
    {
        private readonly IGetAllHotelStaffsService _getAllHotelStaffsService;

        public GetAllHotelStaffsQueryHandler(IGetAllHotelStaffsService getAllHotelStaffsService)
        {
            _getAllHotelStaffsService = getAllHotelStaffsService;
        }

        public async Task<IEnumerable<HotelStaffDto>> Handle(GetAllHotelStaffsQuery request, CancellationToken cancellationToken)
        {
            return await _getAllHotelStaffsService.GetAllAsync(cancellationToken);
        }
    }
}
