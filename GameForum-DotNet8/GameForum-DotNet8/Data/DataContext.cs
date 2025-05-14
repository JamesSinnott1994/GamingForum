using GameForum_DotNet8.Entities;
using Microsoft.EntityFrameworkCore;

namespace GameForum_DotNet8.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        // Name of our table
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
