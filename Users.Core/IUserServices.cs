using Strength.DB;
using System;
using System.Collections.Generic;
using System.Text;

namespace Users.Core
{
    public interface IUserServices
    {
        string CreateUser(User user);
        User Login(string email, string password);
        void CreateProgram(int UserId, string ProgrName);
        void CreateDay(int ProgramId, string DayName);
        void CreateExercise(int DayId, string ExcName, int setsNumber);
    }
}
