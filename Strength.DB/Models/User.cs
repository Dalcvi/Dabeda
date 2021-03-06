﻿using Strength.DB.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Strength.DB
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public ICollection<ExProgram> Programs { get; set; }
    }
}
