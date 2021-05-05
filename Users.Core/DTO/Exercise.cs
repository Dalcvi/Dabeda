using Newtonsoft.Json;
using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SetsAmount { get; set; }
        public int DayId { get; set; }
        public int ProgramId { get; set; }

        public Exercise(Strength.DB.Models.Exercise e)
        {
            Id = e.Id;
            Name = e.Name;
            SetsAmount = e.SetsAmount;
            DayId = e.Day.Id;
            ProgramId = e.Program.Id;
        }

        [JsonConstructor]
        public Exercise(int id = 0, string name = null, int setsAmount = 0, int day = 0, int program = 0)
        {
            Id = id;
            Name = name;
            SetsAmount = setsAmount;
            DayId = day;
            ProgramId = program;
        }
    }
}
