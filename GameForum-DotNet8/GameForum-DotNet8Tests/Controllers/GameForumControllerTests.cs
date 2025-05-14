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
                .UseInMemoryDatabase(databaseName: "GameForumDB")
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
    }
}