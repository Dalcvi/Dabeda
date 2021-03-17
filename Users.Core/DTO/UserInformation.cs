using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class UserInformation
    {
        public List<ExProgram> Programs { get; set; }
        public List<Day> Days { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
