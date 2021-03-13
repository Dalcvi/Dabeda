using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public ICollection<ExProgram> Programs { get; set; }

        public static explicit operator User(Strength.DB.User e) => new User
        {
            Id = e.Id,
            Username = e.Username,
            Email = e.Email,
            Programs = (ICollection<ExProgram>)e.Programs
        };
    }
}
