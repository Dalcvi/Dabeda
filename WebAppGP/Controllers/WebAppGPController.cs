using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Users.Core;
using Strength.DB;
using System.Text.Json;
using Strength.DB.Models;

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

        //add-------------------
        [HttpPost("addProgram")]
        public IActionResult AddProgram([FromBody] JsonElement data)
        {
            try
            {
                int userId = data.GetProperty("UserId").GetInt32();
                string progrName = data.GetProperty("ProgramName").GetString();
                ExProgram program = _userServices.CreateProgram(userId, progrName);

                return Ok(new 
                { 
                    program.Id,
                    program.Name,
                    UserId = program.User.Id
                });
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
                Day day = _userServices.CreateDay(progrId, dayName);

                return Ok(new 
                { 
                    day.Id,
                    day.Name,
                    ProgramId = day.Program.Id
                });
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
                Exercise exer = _userServices.CreateExercise(dayId, exerName, setsNumber);

                return Ok(new 
                { 
                    exer.Id,
                    exer.Name,
                    exer.SetsAmount,
                    DayId = exer.Day.Id
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        //edit-------------------
        [HttpPost("editProgram")]
        public IActionResult EditProgram([FromBody] JsonElement data)
        {
            try
            {
                int programId = data.GetProperty("ProgramId").GetInt32();
                string programName = data.GetProperty("ProgramName").GetString();
                _userServices.EditProgram(programId, programName);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("editDay")]
        public IActionResult EditDay([FromBody] JsonElement data)
        {
            try
            {
                int dayId = data.GetProperty("DayId").GetInt32();
                string dayName = data.GetProperty("DayName").GetString();
                _userServices.EditDay(dayId, dayName);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("editExercise")]
        public IActionResult EditExercise([FromBody] JsonElement data)
        {
            try
            {
                int exerciseId = data.GetProperty("ExerciseId").GetInt32();
                string exerciseName = data.GetProperty("ExerciseName").GetString();
                int setsAmount = data.GetProperty("SetsAmount").GetInt32();
                _userServices.EditExercise(exerciseId, exerciseName, setsAmount);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //delete-------------------
        [HttpPost("deleteProgram")]
        public IActionResult DeleteProgram([FromBody] JsonElement data)
        {
            try
            {
                int programId = data.GetProperty("ProgramId").GetInt32();
                _userServices.DeleteProgram(programId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("deleteDay")]
        public IActionResult DeleteDay([FromBody] JsonElement data)
        {
            try
            {
                int dayId = data.GetProperty("DayId").GetInt32();
                _userServices.DeleteDay(dayId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("deleteExercise")]
        public IActionResult DeleteExercise([FromBody] JsonElement data)
        {
            try
            {
                int exerciseId = data.GetProperty("ExerciseId").GetInt32();
                _userServices.DeleteExercise(exerciseId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
