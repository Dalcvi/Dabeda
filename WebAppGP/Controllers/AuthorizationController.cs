using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Users.Core;
using Strength.DB;
using Users.Core.CustomExceptions;
using System;

namespace WebAppGP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly ILogger<AuthorizationController> _logger;
        private IUserServices _userServices;

        public AuthorizationController(ILogger<AuthorizationController> logger, IUserServices userServices)
        {
            _logger = logger;
            _userServices = userServices;
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp(User user)
        {
            try
            {
                var result = await _userServices.SignUp(user);

                // when a user signs up, he gets a starting program
                _userServices.CreateInitialProgram(result.Id);
                return Created("", result);
            }
            catch (System.Exception e)
            {
                if (e is UsernameAlreadyExistsException || e is EmailAlreadyExistsException)
                    return StatusCode(409, e.Message);
                return StatusCode(500, "Unknown error");
            }
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn(User user)
        {
            try
            {
                var result = await _userServices.SignIn(user);
                return Ok(result);
            }
            catch (InvalidUsernamePasswordException e)
            {
                return StatusCode(401, e.Message);
            }
        }
    }
}
