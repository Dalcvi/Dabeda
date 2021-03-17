using System;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Users.Core;
using Strength.DB.Models;

namespace WebAppGP.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramsController : ControllerBase
    {
        private readonly IUserPrograms _userPrograms;

        public ProgramsController(IUserPrograms userPrograms)
        {
            _userPrograms = userPrograms;
        }

        [HttpGet("getUserInfo")]
        public IActionResult GetUserInfo()
        {
            try
            {
                return Ok(_userPrograms.GetUserInformation());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //add-------------------
        [HttpPost("addProgram")]
        public IActionResult AddProgram(string programName)
        {
            //try
            //{
            //string progrName = data.GetProperty("ProgramName").GetString();        
            ExProgram program = _userPrograms.CreateProgram(programName);

            return Ok(new
            {
                program.Id
            });
            //}
            //catch(Exception e)
            //{
            //    return BadRequest(e.Message);
            //}
        }

        [HttpPost("addDay")]
        public IActionResult AddDay([FromBody] JsonElement data)
        {
            try
            {
                int progrId = data.GetProperty("ProgramId").GetInt32();
                string dayName = data.GetProperty("DayName").GetString();
                
                Day day = _userPrograms.CreateDay(progrId, dayName);

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
                Exercise exer = _userPrograms.CreateExercise(dayId, exerName, setsNumber);

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
                _userPrograms.EditProgram(programId, programName);
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
                _userPrograms.EditDay(dayId, dayName);
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
                _userPrograms.EditExercise(exerciseId, exerciseName, setsAmount);
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
                _userPrograms.DeleteProgram(programId);
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
                _userPrograms.DeleteDay(dayId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("deleteExercise")]
        public IActionResult DeleteExercise([FromBody] JsonElement data)
        {
            try
            {
                int exerciseId = Convert.ToInt32(data.GetProperty("ExerciseId").ToString());
                _userPrograms.DeleteExercise(exerciseId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
