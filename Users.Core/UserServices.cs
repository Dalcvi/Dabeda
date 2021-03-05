using Strength.DB;
using Strength.DB.Models;
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

        public void CreateProgram(int UserId, string ProgrName)
        {
            User user = _context.Users.FirstOrDefault(n => n.Id == UserId);
            if(user == null)
            {
                //dangis lmao EXcEPTION
                return;
            }
            ExProgram program = new ExProgram();
            program.Name = ProgrName;
            program.User = user;
            _context.Programs.Add(program);
            _context.SaveChanges();
        }

        public void CreateDay(int ProgramId, string DayName)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == ProgramId);
            if (program == null)
            {
                //dangis lmao EXcEPTION
            }
            Day day = new Day();
            day.Name = DayName;
            day.Program = program;
            _context.Days.Add(day);
            _context.SaveChanges();
        }

        public void CreateExercise(int DayId, string ExcName, int setsAmount)
        {
            Day day = _context.Days.FirstOrDefault(n => n.Id == DayId);
            if (day == null)
            {
                //dangis lmao EXcEPTION
            }
            Exercise exer = new Exercise();
            exer.Name = ExcName;
            exer.Day = day;
            exer.SetsAmount = setsAmount;
            _context.Exercises.Add(exer);
            _context.SaveChanges();
        }

    }
}
