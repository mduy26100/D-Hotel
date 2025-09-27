using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.User;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelStaff;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Consts;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.CreateHotelStaff
{
    public class CreateHotelStaffService : ICreateHotelStaffService
    {
        private readonly IHotelStaffRepository _hotelStaffRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly IUserService _userService;
        private readonly IHotelRepository _hotelRepository;

        public CreateHotelStaffService(IHotelStaffRepository hotelStaffRepository
            , IMapper mapper
            , IApplicationDbContext context
            , IUserService userService
            , IHotelRepository hotelRepository)
        {
            _hotelStaffRepository = hotelStaffRepository;
            _mapper = mapper;
            _context = context;
            _userService = userService;
            _hotelRepository = hotelRepository;
        }

        public async Task<HotelStaffDto> CreateAsync(HotelStaffDto hotelStaffDto, CancellationToken cancellationToken)
        {
            bool userExists = await _userService.UserExistsAsync(hotelStaffDto.UserId);
            if (!userExists)
            {
                throw new Exception("User does not exist.");
            }

            var roles = await _userService.GetUserRolesAsync(hotelStaffDto.UserId);
            if (!roles.Contains(Roles.HotelStaff))
            {
                throw new Exception("User does not have permission to create hotel.");
            }

            var hotelExists = await _hotelRepository.AnyAsync(h => h.Id == hotelStaffDto.HotelId, cancellationToken);
            if (!hotelExists)
            {
                throw new Exception("Hotel does not exist");
            }

            var entity = _mapper.Map<HotelStaff>(hotelStaffDto);
            await _hotelStaffRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<HotelStaffDto>(entity);
        }
    }
}
