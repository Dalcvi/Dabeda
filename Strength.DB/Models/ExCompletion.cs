using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Strength.DB.Models
{
    public class ExCompletion
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Exercise Exercise { get; set; }
        public ICollection<Set> Sets { get; set; }
    }
}
