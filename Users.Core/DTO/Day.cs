using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class Day
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Program { get; set; }

        public Day(Strength.DB.Models.Day d)
        {
            Id = d.Id;
            Name = d.Name;
            Program = d.Program.Id;
        }
    }
}
