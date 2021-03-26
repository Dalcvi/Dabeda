using System;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using DTO = Users.Core.DTO;
using Strength.DB.Models;
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
        public IActionResult AddProgram([FromBody] DTO.ExProgram dataProgram)
        {
            try
            {
                ExProgram program = _userPrograms.CreateProgram(dataProgram.Name);
                return Ok(new
                {
                    program.Id
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("addDay")]
        public IActionResult AddDay([FromBody] DTO.Day dataDay)
        {
            try
            {
                Day day = _userPrograms.CreateDay(dataDay.Program, dataDay.Name);

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
        public IActionResult AddExercise([FromBody] DTO.Exercise dataExercise)
        {
            try
            {
                Exercise exer = _userPrograms.CreateExercise(dataExercise.Day, dataExercise.Name, dataExercise.SetsAmount);

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
        public IActionResult EditProgram([FromBody] DTO.ExProgram dataProgram)
        {
            try
            {
                _userPrograms.EditProgram(dataProgram.Id, dataProgram.Name);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("editDay")]
        public IActionResult EditDay([FromBody] DTO.Day day)
        {
            try
            {
                _userPrograms.EditDay(day.Id, day.Name);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("editExercise")]
        public IActionResult EditExercise([FromBody] DTO.Exercise dataExercise)
        {
            try
            {
                _userPrograms.EditExercise(dataExercise.Id, dataExercise.Name, dataExercise.SetsAmount);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //delete-------------------
        [HttpPost("deleteProgram")]
        public IActionResult DeleteProgram([FromBody] DTO.ExProgram dataExProgram)
        {
            try
            {
                _userPrograms.DeleteProgram(dataExProgram.Id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("deleteDay")]
        public IActionResult DeleteDay([FromBody] DTO.Day dataDay)
        {
            try
            {
                _userPrograms.DeleteDay(dataDay.Id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost("deleteExercise")]
        public IActionResult DeleteExercise([FromBody] DTO.Exercise dataExercise)
        {
            try
            {
                _userPrograms.DeleteExercise(dataExercise.Id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
