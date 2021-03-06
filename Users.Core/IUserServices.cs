using Strength.DB;
using Strength.DB.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Users.Core
{
    public interface IUserServices
    {
        string CreateUser(User user);
        User Login(string email, string password);

        //create
        ExProgram CreateProgram(int UserId, string ProgrName);
        Day CreateDay(int ProgramId, string DayName);
        Exercise CreateExercise(int DayId, string ExcName, int setsNumber);

        //edit
        void EditProgram(int ProgramId, string ProgramName);
        void EditDay(int DayId, string DayName);
        void EditExercise(int ExerciseId, string ExerciseName, int SetsAmount);

        //delete
        void DeleteProgram(int ProgramId);
        void DeleteDay(int DayId);
        void DeleteExercise(int ExerciseId);
    }
}
