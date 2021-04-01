﻿using System;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using DTO = Users.Core.DTO;
using Strength.DB.Models;
using Users.Core;
using Users.Core.CustomExceptions;
using Strength.DB;
using Users.Core.DTO;
using System.Threading.Tasks;

namespace WebAppGP.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly IUserSettings _userSettings;

        public SettingsController(IUserSettings userSettings)
        {
            _userSettings = userSettings;
        }

        [HttpPost("changePassword")]
        public IActionResult ChangePassword(PasswordChangeModel model)
        {
            try
            {
                _userSettings.ChangePassword(model.CurrentPassword, model.NewPassword, model.ConfirmedPassword);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(400, e.Message);
            }
        }
    }
}
