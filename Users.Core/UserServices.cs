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

        public bool Login(string email)
        {
            return _context.Users.FirstOrDefault(n => n.Email == email) != null;
        }
    }
}
