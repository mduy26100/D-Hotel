using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelById
{
    public record GetHotelByIdQuery(int Id) : IRequest<HotelDto>;
}