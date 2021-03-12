using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class ExProgram
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public ICollection<Day> Days { get; set; }

        public static explicit operator ExProgram(Strength.DB.Models.ExProgram e) => new ExProgram
        {
            Id = e.Id,
            Name = e.Name,
            User = (User)e.User,
            Days = (ICollection<Day>)e.Days
        };
    }
}
