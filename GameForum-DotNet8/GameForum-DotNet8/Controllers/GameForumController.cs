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

        // Test to return a Post
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetAllPosts() 
        {
            var posts = await _context.Posts.ToListAsync();
            return Ok(posts); // Returns status code 200
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post>>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post is null)
                return  BadRequest("Post not found.");
            return Ok(post); // Returns status code 200
        }

        [HttpPost]
        public async Task<ActionResult<List<Post>>> AddPost(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return Ok(await _context.Posts.ToListAsync()); // Returns status code 200
        }

        [HttpPut]
        public async Task<ActionResult<List<Post>>> UpdatePost(Post updatedPost)
        {
            var dbPost = await _context.Posts.FindAsync(updatedPost.Id);
            if (dbPost is null)
                return BadRequest("Post not found.");

            dbPost.Title = updatedPost.Title;
            dbPost.Content = updatedPost.Content;

            await _context.SaveChangesAsync();

            return Ok(await _context.Posts.ToListAsync()); // Returns status code 200
        }

        [HttpDelete]
        public async Task<ActionResult<List<Post>>> DeletePost(int id)
        {
            var dbPost = await _context.Posts.FindAsync(id);
            if (dbPost is null)
                return BadRequest("Post not found.");

            _context.Posts.Remove(dbPost);
            await _context.SaveChangesAsync();

            return Ok(await _context.Posts.ToListAsync()); // Returns status code 200
        }
    }
}
