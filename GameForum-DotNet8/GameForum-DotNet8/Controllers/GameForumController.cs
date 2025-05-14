using GameForum_DotNet8.Data;
using GameForum_DotNet8.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameForum_DotNet8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameForumController : ControllerBase
    {
        // He is using a "Fat Controller" for tutorial purposes instead of 
        // having a Service or Repository Layer

        // Inject the data context into the controller (Would use a Service here instead)
        private readonly DataContext _context;

        public GameForumController(DataContext context)
        {
            _context = context;
        }


        // ********************** Post CRUD Operations ********************** \\

        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetAllPosts() 
        {
            var posts = await _context.Posts.ToListAsync();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post>>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post is null) return  BadRequest("Post not found.");
            return Ok(post);
        }

        [HttpPost]
        public async Task<ActionResult<List<Post>>> AddPost(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return Ok(await _context.Posts.ToListAsync());
        }

        // ********************** Post CRUD Operations ********************** \\


        // ********************** Comment CRUD Operations ********************** \\

        // Get all comments associated with a post
        [HttpGet("{postId}/comments")]
        public async Task<ActionResult<List<Comment>>> GetComments(int postId)
        {
            var post = await _context.Posts.Include(p => p.Comments)
                .FirstOrDefaultAsync(p => p.Id == postId);
            if (post == null) return NotFound("Post not found.");
            return Ok(post.Comments);
        }


        // ********************** Comment CRUD Operations ********************** \\
    }
}
