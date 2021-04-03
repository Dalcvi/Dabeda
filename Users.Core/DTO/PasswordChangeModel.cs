using System;
using System.Collections.Generic;
using System.Text;

namespace Users.Core.DTO
{
    public class PasswordChangeModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmedPassword { get; set; }
    }
}
