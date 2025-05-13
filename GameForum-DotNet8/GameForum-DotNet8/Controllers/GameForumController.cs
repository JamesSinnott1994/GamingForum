using GameForum_DotNet8.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameForum_DotNet8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameForumController : ControllerBase
    {
        // He is using a "Fat Controller" for tutorial purposes instead of 
        // having a Service or Repository Layer

        // Test to return a Post
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetAllPosts() 
        {
            var posts = new List<Post>
            {
                new Post
                {
                    Id = 1,
                    Title = "Medieval PS5 Release Date Announced",
                    Content = "It has been announced that a remake of Medieval for the PS5 will be released soon",

                }
            };
            return Ok(posts); // Returns status code 200
        }
    }
}
