using System;
using Microsoft.AspNetCore.Mvc;
using DTO = Users.Core.DTO;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Users.Core;

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

        //add-------------------
        [HttpPost("addProgram")]
        public IActionResult AddProgram([FromBody] JsonElement data)
        {
            try
            {
                string username = data.GetProperty("Username").GetString();
                string progrName = data.GetProperty("ProgramName").GetString();
                string id = data.GetProperty("Id").GetString();
                DTO.ExProgram program = _userPrograms.CreateProgram(id, username, progrName);

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
                string id = data.GetProperty("Id").GetString();
                DTO.Day day = _userPrograms.CreateDay(id, progrId, dayName);

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
                string id = data.GetProperty("Id").GetString();
                DTO.Exercise exer = _userPrograms.CreateExercise(id, dayId, exerName, setsNumber);

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
                string id = data.GetProperty("Id").GetString();
                _userPrograms.EditProgram(id, programId, programName);
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
                string id = data.GetProperty("Id").GetString();
                _userPrograms.EditDay(id, dayId, dayName);
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
                string id = data.GetProperty("Id").GetString();
                _userPrograms.EditExercise(id, exerciseId, exerciseName, setsAmount);
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
                string id = data.GetProperty("Id").GetString();
                _userPrograms.DeleteProgram(id, programId);
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
                string id = data.GetProperty("Id").GetString();
                _userPrograms.DeleteDay(id, dayId);
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
                string id = data.GetProperty("Id").GetString();
                _userPrograms.DeleteExercise(id, exerciseId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
