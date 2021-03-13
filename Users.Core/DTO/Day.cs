using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class Day
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ExProgram Program { get; set; }
        public ICollection<Exercise> Exercises { get; set; }

        public static explicit operator Day(Strength.DB.Models.Day d) => new Day
        {
            Id = d.Id,
            Name = d.Name,
            Program = (ExProgram)d.Program,
            Exercises = (ICollection<Exercise>)d.Exercises
        };
    }
}
