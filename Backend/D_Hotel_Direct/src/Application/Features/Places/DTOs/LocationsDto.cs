namespace Application.Features.Places.DTOs
{
    public class LocationsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string ImgUrl { get; set; } = default!;
    }
}
