namespace Application.Features.Auth.DTOs
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? AvatarUrl { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
    }
}
