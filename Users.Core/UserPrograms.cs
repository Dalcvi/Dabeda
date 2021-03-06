﻿using Microsoft.AspNetCore.Http;
using System.Linq;
using Strength.DB;
using Strength.DB.Models;
using Users.Core.CustomExceptions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;

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


        public List<DTO.ReturnExercise> GetCompletionsByDay(int dayId)
        {
            List<DTO.ReturnExercise> returnedList = new List<DTO.ReturnExercise>();

            List<List<DTO.ReturnExercise>> completionsByExercises = _context.Exercises
                .Where(n => n.Day.Id == dayId && _user.Id == n.Program.User.Id)
                .Include(n => n.Completions).AsEnumerable().Select(n =>
            {
                List<DTO.ReturnExercise> completions = new List<DTO.ReturnExercise>();
                if (n.Completions != null)
                foreach (ExCompletion comp in n.Completions)
                {
                    completions.Add(new DTO.ReturnExercise
                    {
                        Id = comp.Id,
                        ExerciseId = n.Id,
                        Weight = comp.Weight,
                        Reps = comp.Reps.Split(',').Select(Int32.Parse).ToArray(),
                        Date = comp.Date.ToString("yyyy-MM-dd")
                    });
                }
                return completions;
            }).ToList();

            foreach(List<DTO.ReturnExercise> completions in completionsByExercises)
            {
                returnedList.AddRange(completions);
            }

            return returnedList;
        }

        /// <summary>
        /// used for publishing exercises to the database, assigning new datetime, giving new id for an exercise completion
        /// takes a list of exercises: {Id, Name, Weight, Reps}
        /// </summary>
        /// <param name="exercises"></param>
        /// <returns> a new list that contains previous list, but has datetime and exercise id </returns>
        public List<DTO.ReturnExercise> RegisterExercises(List<DTO.ReceiveExercise> exercises)
        {
            List<DTO.ReturnExercise> returnedList = new List<DTO.ReturnExercise>();
            foreach (DTO.ReceiveExercise ex in exercises)
            {
                string repetitions = "";
                if (ex != null && ex.Reps != null && _context.Exercises.FirstOrDefault(n => n.Id == ex.ExerciseId && _user.Id == n.Program.User.Id) != null)
                {
                    // Converting int[] reps to a single string, e.g. {5, 4, 3, 2, 5, 4} to "5,4,3,2,5,4" with commas in between
                    repetitions = string.Join(",", ex.Reps);

                    ExCompletion completion = new ExCompletion();
                    completion.Date = DateTime.Now;
                    completion.Reps = repetitions;
                    completion.Weight = ex.Weight;
                    completion.Exercise = _context.Exercises.FirstOrDefault(n => n.Id == ex.ExerciseId);
                    _context.Completions.Add(completion);
                    _context.SaveChanges();

                    returnedList.Add(new DTO.ReturnExercise
                    {
                        Id = completion.Id,
                        ExerciseId = ex.ExerciseId,
                        Weight = completion.Weight,
                        Reps = ex.Reps,
                        Date = completion.Date.ToString("yyyy-MM-dd")
                    });
                }
            }
            return returnedList;
        }

        /// <summary>
        /// used for getting information about a user: their username, programs, days, exercises
        /// </summary>
        /// <returns> gathered user information </returns>
        public DTO.UserInformation GetUserInformation()
        {
            // getting a list of their programs
            List<DTO.ExProgram> programs = _context.Programs
                .Where(n => n.User.Id == _user.Id).Select(e => new DTO.ExProgram(e)).ToList();

            // checking if a user has any programs
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

            // getting a list of user's days in their program
            List<DTO.Day> days = _context.Days.Include(n => n.Program)
                .Where(n => n.Program.User.Id == _user.Id).Select(e => new DTO.Day(e)).ToList();

            // checking if user has any days created in their program
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

            // getting a list of user's exercises in their day
            List<DTO.Exercise> exercises = _context.Exercises.Include(n => n.Program).Include(n => n.Day)
                .Where(n => n.Program.User.Id == _user.Id).Select(e => new DTO.Exercise(e)).ToList();

            // checking if user has any exercises created in their day
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

            // if everything else passes, means user has filled their programs, days and exercises
            return new DTO.UserInformation
            {
                Username = _user.Username,
                Programs = programs,
                Days = days,
                Exercises = exercises
            };
        }

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Create ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        public ExProgram CreateProgram(string progrName)
        {
            // checking if user was found and provided program name is not null
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

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edit ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
            Day day = _context.Days.Include(n => n.Program).FirstOrDefault(n => n.Id == dayId && n.Program.User.Id == _user.Id);

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
