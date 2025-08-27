namespace Application.Features.Places.DTOs
{
    public class UpsertLocationRequest
    {
        public int? Id { get; set; }
        public required string Name { get; set; }
        public Stream? ImageContent { get; set; }
        public string? ImageFileName { get; set; }
        public string? ImageContentType { get; set; }
    }
}
