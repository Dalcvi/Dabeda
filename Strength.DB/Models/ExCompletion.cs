using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Strength.DB.Models
{
    public class ExCompletion
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Exercise Exercise { get; set; }
        public int Weight { get; set; }
        public string Reps { get; set; }
    }
}
