using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelCategory;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.UpdateHotelCategory
{
    public class UpdateHotelCategoryService : IUpdateHotelCategoryService
    {
        private readonly IHotelCategoryRepository _hotelCategoryRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateHotelCategoryService(IHotelCategoryRepository hotelCategoryRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelCategoryRepository = hotelCategoryRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(HotelCategoryDto hotelCategoryDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelCategory>(hotelCategoryDto);
            _hotelCategoryRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}
