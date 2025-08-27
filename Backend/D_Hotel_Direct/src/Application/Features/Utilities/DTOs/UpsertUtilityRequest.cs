namespace Application.Features.Utilities.DTOs
{
    public class UpsertUtilityRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; } = default!;
        public Stream? ImageContent { get; set; }
        public string? ImageFileName { get; set; }
        public string? ImageContentType { get; set; }
    }
}
