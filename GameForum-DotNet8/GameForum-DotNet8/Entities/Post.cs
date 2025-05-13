namespace GameForum_DotNet8.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public required string Title { get; set; } = string.Empty;
        public string Content {  get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Comment> Comments { get; set; } = new();
    }
}
