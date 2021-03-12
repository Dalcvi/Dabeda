using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SetsAmount { get; set; }
        public Day Day { get; set; }
        public ICollection<ExCompletion> Completions { get; set; }

        public static explicit operator Exercise(Strength.DB.Models.Exercise e) => new Exercise
        {
            Id = e.Id,
            Name = e.Name,
            SetsAmount = e.SetsAmount,
            Day = (Day)e.Day,
            Completions = (ICollection<ExCompletion>)e.Completions
        };
    }
}
