using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Strength.DB.Models
{
    public class Day
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public ExProgram Program { get; set; }
        public ICollection<Exercise> Exercises { get; set; }

    }
}
