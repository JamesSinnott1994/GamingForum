using Microsoft.VisualStudio.TestTools.UnitTesting;
using GameForum_DotNet8.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using GameForum_DotNet8.Data;
using Moq;
using GameForum_DotNet8.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace GameForum_DotNet8.Controllers.Tests
{
    [TestClass()]
    public class GameForumControllerTests
    {
        private DataContext _context;
        private GameForumController _controller;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Unqiue DB name needed per test
                .Options;

            _context = new DataContext(options);
            _context.Posts.AddRange(new List<Post>
        {
            new Post { Id = 1, Title = "Post 1", Content = "Content 1" },
            new Post { Id = 2, Title = "Post 2", Content = "Content 2" }
        });
            _context.SaveChanges();

            _controller = new GameForumController(_context);
        }

        [TestMethod]
        public async Task GetAllPosts_ReturnsOkResult_WithPosts()
        {
            // Act
            var result = await _controller.GetAllPosts();

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var posts = okResult.Value as List<Post>;
            Assert.AreEqual(2, posts.Count);
        }

        [TestMethod]
        public async Task GetPost_ReturnsPost_WhenFound()
        {
            var result = await _controller.GetPost(1);

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var post = okResult.Value as Post;
            Assert.IsNotNull(post);
            Assert.AreEqual(1, post.Id);
        }

        [TestMethod]
        public async Task GetPost_ReturnsBadRequest_WhenNotFound()
        {
            var result = await _controller.GetPost(999);

            var badRequestResult = result.Result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.AreEqual("Post not found.", badRequestResult.Value);
        }

        [TestMethod]
        public async Task AddPost_AddsPost_AndReturnsAllPosts()
        {
            var newPost = new Post { Title = "New Post", Content = "New Content" };

            var result = await _controller.AddPost(newPost);

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var posts = okResult.Value as List<Post>;
            Assert.IsTrue(posts.Any(p => p.Title == "New Post"));
            Assert.AreEqual(3, posts.Count);
        }

        [TestMethod]
        public async Task GetComments_ReturnsComments_WhenPostExists()
        {
            // Arrange
            var comments = new List<Comment>
            {
                new Comment { Text = "Comment 1", PostId = 1, CreatedAt = DateTime.UtcNow },
                new Comment { Text = "Comment 2", PostId = 1, CreatedAt = DateTime.UtcNow }
            };

            _context.Comments.AddRange(comments);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetComments(1);

            // Assert
            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var returnedComments = okResult.Value as List<Comment>;
            Assert.AreEqual(2, returnedComments.Count);
        }

        [TestMethod]
        public async Task GetComments_ReturnsNotFound_WhenPostDoesNotExist()
        {
            var result = await _controller.GetComments(999);

            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual("Post not found.", notFoundResult.Value);
        }

        [TestMethod]
        public async Task AddComment_AddsComment_WhenPostExists()
        {
            var comment = new Comment { Text = "New Comment" };

            var result = await _controller.AddComment(1, comment);

            var okResult = result.Result as OkObjectResult;
            Assert.IsNotNull(okResult);

            var returnedComment = okResult.Value as Comment;
            Assert.IsNotNull(returnedComment);
            Assert.AreEqual("New Comment", returnedComment.Text);
            Assert.AreEqual(1, returnedComment.PostId);

            var postComments = await _context.Posts.Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == 1);
            Assert.IsTrue(postComments.Comments.Any(c => c.Text == "New Comment"));
        }

        [TestMethod]
        public async Task AddComment_ReturnsNotFound_WhenPostDoesNotExist()
        {
            var comment = new Comment { Text = "Comment on non-existing post" };

            var result = await _controller.AddComment(999, comment);

            var notFoundResult = result.Result as NotFoundObjectResult;
            Assert.IsNotNull(notFoundResult);
            Assert.AreEqual("Post not found.", notFoundResult.Value);
        }
    }
}