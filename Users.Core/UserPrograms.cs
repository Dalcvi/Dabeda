using Microsoft.AspNetCore.Http;
using System.Linq;
using Strength.DB;
using Strength.DB.Models;
using Users.Core.CustomExceptions;

namespace Users.Core
{
    public class UserPrograms : IUserPrograms
    {
        private readonly AppDbContext _context;
        private readonly User _user;

        public UserPrograms(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _user = _context.Users.First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);
        }

        
        public DTO.ExProgram CreateProgram(string id, string username, string progrName)
        {
            User user = _context.Users.FirstOrDefault(n => n.Username == username && n.Id == id);
            if (user == null)
            {
                throw new UnableToCreateAProgram("Unable to create a program");
            }
            ExProgram program = new ExProgram();
            program.Name = progrName;
            program.User = user;
            _context.Programs.Add(program);

            _context.SaveChanges();
            return (DTO.ExProgram)program;
        }
        public DTO.Day CreateDay(string id, int programId, string dayName)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == programId && n.User.Id == id);
            if (program == null)
            {
                throw new UnableToCreateDay("Unable to create day");
            }
            Day day = new Day();
            day.Name = dayName;
            day.Program = program;
            _context.Days.Add(day);

            _context.SaveChanges();
            return (DTO.Day)day;
        }
        public DTO.Exercise CreateExercise(string id, int dayId, string excName, int setsAmount)
        {
            Day day = _context.Days.FirstOrDefault(n => n.Id == dayId && n.Program.User.Id == id);
            if (day == null)
            {
                throw new UnableToCreateExercise("Unable to create exercise");
            }
            Exercise exer = new Exercise();
            exer.Name = excName;
            exer.Day = day;
            exer.SetsAmount = setsAmount;
            _context.Exercises.Add(exer);

            _context.SaveChanges();
            return (DTO.Exercise)exer;
        }

        //Edit-----------
        public void EditProgram(string id, int programId, string programName)
        {
            try
            {
                _context.Programs.FirstOrDefault(n => n.Id == programId && n.User.Id == id).Name = programName;
                _context.SaveChanges();
            }
            catch
            {
                throw new DoesNotMatchIdException("Program does not belong to user");
            }
        }
        public void EditDay(string id, int dayId, string dayName)
        {
            try
            {
                _context.Days.FirstOrDefault(n => n.Id == dayId && n.Program.User.Id == id).Name = dayName;
                _context.SaveChanges();
            }
            catch
            {
                throw new DoesNotMatchIdException("Program does not belong to user");
            }
        }
        public void EditExercise(string id, int exerciseId, string exerciseName, int setsAmount)
        {
            try
            {
                Exercise exercise = _context.Exercises.FirstOrDefault(n => n.Id == exerciseId && n.Day.Program.User.Id == id);
                if (exercise == null)
                {
                    throw new DoesNotMatchIdException();
                }
                exercise.Name = exerciseName;
                exercise.SetsAmount = setsAmount;
                _context.SaveChanges();
            }
            catch
            {
                throw new DoesNotMatchIdException("Program does not belong to user");
            }
        }

        //Delete------------
        public void DeleteProgram(string id, int programId)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == programId && n.User.Id == id);

            //Also need to delete all the days in the program IF the program contains any
            if (_context.Days.FirstOrDefault(n => n.Program.Id == programId) != null)
            {
                foreach (Day day in _context.Days.Where(n => n.Program.Id == programId).ToList())
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
        public void DeleteDay(string id, int dayId)
        {
            Day day = _context.Days.FirstOrDefault(n => n.Id == dayId);

            //Also need to delete all the exercises from that day IF the day contains any
            if (_context.Exercises.FirstOrDefault(n => n.Day.Id == dayId) != null)
                foreach (Exercise ex in _context.Exercises.Where(n => n.Day.Id == dayId))
                    _context.Exercises.Remove(ex);

            _context.Days.Remove(day);
            _context.SaveChanges();
        }
        public void DeleteExercise(string id, int exerciseId)
        {
            _context.Exercises.Remove(_context.Exercises.FirstOrDefault(n => n.Id == exerciseId));
            _context.SaveChanges();
        }
    }
}
