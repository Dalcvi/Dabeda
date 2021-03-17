using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SetsAmount { get; set; }
        public int Day { get; set; }
        public int Program { get; set; }

        public Exercise(Strength.DB.Models.Exercise e)
        {
            Id = e.Id;
            Name = e.Name;
            SetsAmount = e.SetsAmount;
            Day = e.Day.Id;
            Program = e.Program.Id;
        }
    }
}
