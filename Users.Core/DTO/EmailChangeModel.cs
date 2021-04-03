using System;
using System.Collections.Generic;
using System.Text;

namespace Users.Core.DTO
{
    public class EmailChangeModel
    {
        public string CurrentPassword { get; set; }
        public string Email { get; set; }
    }
}
