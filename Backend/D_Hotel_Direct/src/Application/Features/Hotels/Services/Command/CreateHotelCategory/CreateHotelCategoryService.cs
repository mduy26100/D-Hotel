using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelCategory;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.CreateHotelCategory
{
    public class CreateHotelCategoryService : ICreateHotelCategoryService
    {
        private readonly IHotelCategoryRepository _hotelCategoryRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        public CreateHotelCategoryService(IHotelCategoryRepository hotelCategoryRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _hotelCategoryRepository = hotelCategoryRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<HotelCategoryDto> CreateAsync(HotelCategoryDto hotelCategoryDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<HotelCategory>(hotelCategoryDto);
            await _hotelCategoryRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<HotelCategoryDto>(entity);
        }
    }
}
