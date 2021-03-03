using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Users.Core;
using Strength.DB;

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

        [HttpGet("{email}")]
        public IActionResult Login(string email)
        {
            return Ok(_userServices.Login(email));
        }
    }
}
