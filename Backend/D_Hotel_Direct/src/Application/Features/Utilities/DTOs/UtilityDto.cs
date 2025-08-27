namespace Application.Features.Utilities.DTOs
{
    public class UtilityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string IconUrl { get; set; } = default!;
        public List<string> UtilityItems { get; set; } = new();
    }
}
