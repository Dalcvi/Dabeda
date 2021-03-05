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

        [HttpPost("register")]
        public IActionResult CreateUser(User user)
        {
            bool usernameTaken = false;
            bool emailTaken = false;
            string answer = _userServices.CreateUser(user);
            for(int i =0; i < answer.Length; i++)
            {
                switch(answer[i])
                {
                    case 'E':
                        emailTaken = true;
                        break;
                    case 'U':
                        usernameTaken = true;
                        break;
                }
            }
            return Ok(new
            {
                EmailTaken = emailTaken,
                UsernameTaken = usernameTaken
            });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] JsonElement data)
        {
            string email = data.GetProperty("Email").GetString();
            string password = data.GetProperty("Password").GetString();
            User user = _userServices.Login(email, password);
            if (user != null)
                return Ok(new
                {
                    user.Username
                });
            return BadRequest("Username or password is incorrect.");
        }

        [HttpPost("addProgram")]
        public IActionResult AddProgram([FromBody] JsonElement data)
        {
            try
            {
                int userId = data.GetProperty("UserId").GetInt32();
                string progrName = data.GetProperty("ProgramName").GetString();
                _userServices.CreateProgram(userId, progrName);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("addDay")]
        public IActionResult AddDay([FromBody] JsonElement data)
        {
            try
            {
                int progrId = data.GetProperty("ProgramId").GetInt32();
                string dayName = data.GetProperty("DayName").GetString();
                _userServices.CreateDay(progrId, dayName);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("addExercise")]
        public IActionResult AddExercise([FromBody] JsonElement data)
        {
            try
            {
                int dayId = data.GetProperty("DayId").GetInt32();
                string exerName = data.GetProperty("ExerciseName").GetString();
                int setsNumber = data.GetProperty("SetsAmount").GetInt32();
                _userServices.CreateExercise(dayId, exerName, setsNumber);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
