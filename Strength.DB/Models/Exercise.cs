﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Strength.DB.Models
{
    public class Exercise
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int SetsAmount { get; set; }
        public Day Day { get; set; }
        public ExProgram Program { get; set; }
        public ICollection<ExCompletion> Completions { get; set; }
    }
}
