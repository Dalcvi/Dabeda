﻿using Strength.DB.Models;
using System.Collections.Generic;

namespace Users.Core
{
    public interface IUserPrograms
    {
        DTO.UserInformation GetUserInformation();
        List<DTO.ReturnExercise> RegisterExercises(List<DTO.ReceiveExercise> exercises);

        List<DTO.ReturnExercise> GetCompletionsByDay(int dayId);

        //create
        ExProgram CreateProgram(string progrName);
        Day CreateDay(int programId, string dayName);
        Exercise CreateExercise(int dayId, string excName, int setsNumber);

        //edit
        void EditProgram(int programId, string programName);
        void EditDay(int dayId, string dayName);
        void EditExercise(int exerciseId, string exerciseName, int setsAmount);

        //delete
        void DeleteProgram(int programId);
        void DeleteDay(int dayId);
        void DeleteExercise(int exerciseId);
    }
}
