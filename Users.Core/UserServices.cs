using Strength.DB;
using System;
using System.Linq;

namespace Users.Core
{
    public class UserServices : IUserServices
    {
        private AppDbContext _context;
        public UserServices(AppDbContext context)
        {
            _context = context;
        }

        public string CreateUser(User user)
        {
            string usernameTaken = "";
            string emailTaken = "";
            if (_context.Users.FirstOrDefault(n => n.Email == user.Email) != null)
                emailTaken = "E";
            if (_context.Users.FirstOrDefault(n => n.Username == user.Username) != null)
                usernameTaken = "U";
            if (usernameTaken.Length == 0 && emailTaken.Length == 0)
            {
                _context.Add(user);
                _context.SaveChanges();
            }
                return emailTaken + usernameTaken;
        }

        public User Login(string email, string password)
        {
            return _context.Users.Where(n => n.Email == email && n.Password == password).FirstOrDefault();
        }
    }
}
