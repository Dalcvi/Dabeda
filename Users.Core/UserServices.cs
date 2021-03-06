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

        //Create---------
        public ExProgram CreateProgram(int UserId, string ProgrName)
        {
            User user = _context.Users.FirstOrDefault(n => n.Id == UserId);
            if(user == null)
            {
                //dangis lmao EXcEPTION
                return null;
            }
            ExProgram program = new ExProgram();
            program.Name = ProgrName;
            program.User = user;
            _context.Programs.Add(program);

            _context.SaveChanges();
            return program;
        }
        public Day CreateDay(int ProgramId, string DayName)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == ProgramId);
            if (program == null)
            {
                //dangis lmao EXcEPTION
                return null;
            }
            Day day = new Day();
            day.Name = DayName;
            day.Program = program;
            _context.Days.Add(day);

            _context.SaveChanges();
            return day;
        }
        public Exercise CreateExercise(int DayId, string ExcName, int setsAmount)
        {
            Day day = _context.Days.FirstOrDefault(n => n.Id == DayId);
            if (day == null)
            {
                //dangis lmao EXcEPTION
                return null;
            }
            Exercise exer = new Exercise();
            exer.Name = ExcName;
            exer.Day = day;
            exer.SetsAmount = setsAmount;
            _context.Exercises.Add(exer);

            _context.SaveChanges();
            return exer;
        }

        //Edit-----------
        public void EditProgram(int ProgramId, string ProgramName)
        {
            _context.Programs.FirstOrDefault(n => n.Id == ProgramId).Name = ProgramName;
            _context.SaveChanges();
        }
        public void EditDay(int DayId, string DayName)
        {
            _context.Days.FirstOrDefault(n => n.Id == DayId).Name = DayName;
            _context.SaveChanges();
        }
        public void EditExercise(int ExerciseId, string ExerciseName, int SetsAmount)
        {
            _context.Exercises.FirstOrDefault(n => n.Id == ExerciseId).Name = ExerciseName;
            _context.Exercises.FirstOrDefault(n => n.Id == ExerciseId).SetsAmount = SetsAmount;
            _context.SaveChanges();
        }

        //Delete------------
        public void DeleteProgram(int ProgramId)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == ProgramId);

            //Also need to delete all the days in the program IF the program contains any
            if (_context.Days.FirstOrDefault(n => n.Program.Id == ProgramId) != null)
            {
                foreach (Day day in _context.Days.Where(n => n.Program.Id == ProgramId).ToList())
                {
                    //Also need to delete all the exercises from that day IF the day contains any
                    if (_context.Exercises.FirstOrDefault(n => n.Day.Id == day.Id) != null)
                    {
                        foreach (Exercise ex in _context.Exercises.Where(n => n.Day.Id == day.Id).ToList())
                        {
                            _context.Exercises.Remove(ex);
                        }
                    }
                    _context.Days.Remove(day);
                }
            }
            _context.Programs.Remove(program);

            _context.SaveChanges();
        }
        public void DeleteDay(int DayId)
        {
            Day day = _context.Days.FirstOrDefault(n => n.Id == DayId);

            //Also need to delete all the exercises from that day IF the day contains any
            if (_context.Exercises.FirstOrDefault(n => n.Day.Id == DayId) != null)
                foreach (Exercise ex in _context.Exercises.Where(n => n.Day.Id == DayId))
                    _context.Exercises.Remove(ex);

            _context.Days.Remove(day);
            _context.SaveChanges();
        }
        public void DeleteExercise(int ExerciseId)
        {
            _context.Exercises.Remove(_context.Exercises.FirstOrDefault(n => n.Id == ExerciseId));
            _context.SaveChanges();
        }
    }
}
