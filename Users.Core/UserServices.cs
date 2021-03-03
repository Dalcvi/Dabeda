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

        public void CreateUser(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            return _context.Users.Where(n => n.Email == email && n.Password == password).FirstOrDefault();
        }
    }
}
