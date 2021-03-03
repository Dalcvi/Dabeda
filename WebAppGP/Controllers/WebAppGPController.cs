using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Users.Core;
using Strength.DB;
using System.Text.Json;

namespace WebAppGP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebAppGPController : ControllerBase
    {
        private readonly ILogger<WebAppGPController> _logger;
        private IUserServices _userServices;

        public WebAppGPController(ILogger<WebAppGPController> logger, IUserServices userServices)
        {
            _logger = logger;
            _userServices = userServices;
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            _userServices.CreateUser(user);
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] JsonElement data)
        {
            string email = data.GetProperty("Email").GetString();
            string password = data.GetProperty("Password").GetString();
            User user = _userServices.Login(email, password);
            if (user != null)
                return Ok(user.Username);
            return BadRequest("Username or password is incorrect.");
        }
    }
}
