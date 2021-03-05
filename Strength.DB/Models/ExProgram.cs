using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Strength.DB.Models
{
    public class ExProgram
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public ICollection<Day> Days { get; set; }
    }
}
