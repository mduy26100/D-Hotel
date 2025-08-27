using Application.Common.Interfaces.Persistence.EFCore;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.DeleteLocation;
using Application.Features.Places.Repositories;
using AutoMapper;
using Domain.Models.Places;

namespace Application.Features.Places.Services.Command.DeleteLocation
{
    public class DeleteLocationService : IDeleteLocationService
    {
        private readonly ILocationsRepository _locationsRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteLocationService(ILocationsRepository locationsRepository
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _locationsRepository = locationsRepository;
            _mapper = mapper;
            _context = context; 
        }

        public async Task DeleteAsync(LocationsDto locationsDto, CancellationToken cancellationToken = default)
        {
            var entity = _mapper.Map<Locations>(locationsDto);
            _locationsRepository.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            await Task.CompletedTask;
        }
    }
}
