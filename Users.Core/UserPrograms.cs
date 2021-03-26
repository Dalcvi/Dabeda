using Microsoft.AspNetCore.Http;
using System.Linq;
using Strength.DB;
using Strength.DB.Models;
using Users.Core.CustomExceptions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

        public DTO.UserInformation GetUserInformation()
        {
            List<DTO.ExProgram> programs = _context.Programs.Where(n => n.User.Id == _user.Id).Select(e => new DTO.ExProgram(e)).ToList();
            if (programs.Count == 0)
            {
                return new DTO.UserInformation
                {
                    Username = _user.Username,
                    Programs = new List<DTO.ExProgram>(),
                    Days = new List<DTO.Day>(),
                    Exercises = new List<DTO.Exercise>()
                };
            }
            List<DTO.Day> days = _context.Days.Include(n => n.Program).Where(n => n.Program.User.Id == _user.Id).Select(e => new DTO.Day(e)).ToList();
            if (days.Count == 0)
            {
                return new DTO.UserInformation
                {
                    Username = _user.Username,
                    Programs = programs,
                    Days = new List<DTO.Day>(),
                    Exercises = new List<DTO.Exercise>()
                };
            }
            List<DTO.Exercise> exercises = _context.Exercises.Include(n => n.Program).Include(n => n.Day).Where(n => n.Program.User.Id == _user.Id).Select(e => new DTO.Exercise(e)).ToList();
            if (exercises.Count == 0)
            {
                return new DTO.UserInformation
                {
                    Username = _user.Username,
                    Programs = programs,
                    Days = days,
                    Exercises = new List<DTO.Exercise>()
                };
            }
            return new DTO.UserInformation
            {
                Username = _user.Username,
                Programs = programs,
                Days = days,
                Exercises = exercises
            };
        }

        public ExProgram CreateProgram(string progrName)
        {
            User user = _user;
            if (user == null || progrName == null)
            {
                throw new UnableToCreateAProgram("Unable to create a program");
            }
            ExProgram program = new ExProgram();
            program.Name = progrName;
            program.User = user;
            _context.Programs.Add(program);
            _context.SaveChanges();
            return program;
        }

        public Day CreateDay(int programId, string dayName)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == programId && _user.Id == n.User.Id);
            if (program == null || dayName == null)
            {
                throw new UnableToCreateDay("Unable to create day");
            }
            Day day = new Day();
            day.Name = dayName;
            day.Program = program;
            _context.Days.Add(day);
            _context.SaveChanges();
            return day;
        }

        public Exercise CreateExercise(int dayId, string excName, int setsAmount)
        {
            Day day = _context.Days.Include(n => n.Program).FirstOrDefault(n => n.Id == dayId && _user.Id == n.Program.User.Id);
            if (day == null || excName == null || setsAmount == 0)
            {
                throw new UnableToCreateExercise("Unable to create exercise");
            }
            Exercise exer = new Exercise();
            exer.Name = excName;
            exer.Day = day;
            exer.Program = day.Program;
            exer.SetsAmount = setsAmount;
            _context.Exercises.Add(exer);
            _context.SaveChanges();
            return exer;
        }

        //Edit-----------
        public void EditProgram(int programId, string programName)
        {
            try
            {
                ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == programId && _user.Id == n.User.Id);
                if (program == null || programName == null)
                {
                    throw new System.Exception();
                }
                program.Name = programName;
                _context.SaveChanges();
            }
            catch
            {
                throw new DoesNotMatchIdException("Program does not belong to user");
            }
        }
        public void EditDay(int dayId, string dayName)
        {
            try
            {
                Day day = _context.Days.FirstOrDefault(n => n.Id == dayId && _user.Id == n.Program.User.Id);
                if (day == null || dayName == null)
                {
                    throw new System.Exception();
                }
                day.Name = dayName;
                _context.SaveChanges();
            }
            catch
            {
                throw new DoesNotMatchIdException("Program does not belong to user");
            }
        }
        public void EditExercise(int exerciseId, string exerciseName, int setsAmount)
        {
            try
            {
                Exercise exercise = _context.Exercises.FirstOrDefault(n => n.Id == exerciseId && _user.Id == n.Program.User.Id);
                if (exercise == null || exerciseName == null || setsAmount == 0)
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
        public void DeleteProgram(int programId)
        {
            ExProgram program = _context.Programs.FirstOrDefault(n => n.Id == programId && _user.Id == n.User.Id);
            //Also need to delete all the days in the program IF the program contains any
            if (_context.Days.FirstOrDefault(n => n.Program.Id == programId) != null && _user.Id == program.User.Id)
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
        public void DeleteDay(int dayId)
        {
            Day day = _context.Days.Include(n => n.Program).FirstOrDefault(n => n.Id == dayId);

            //Also need to delete all the exercises from that day IF the day contains any
            if (_context.Exercises.FirstOrDefault(n => n.Day.Id == dayId) != null && _user.Id == day.Program.User.Id)
                foreach (Exercise ex in _context.Exercises.Where(n => n.Day.Id == dayId))
                    _context.Exercises.Remove(ex);

            _context.Days.Remove(day);
            _context.SaveChanges();
        }
        public void DeleteExercise(int exerciseId)
        {
            _context.Exercises.Remove(_context.Exercises.FirstOrDefault(n => n.Id == exerciseId && _user.Id == n.Program.User.Id));
            _context.SaveChanges();
        }
    }
}
