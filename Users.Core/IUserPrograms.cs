using Users.Core.DTO;

namespace Users.Core
{
    public interface IUserPrograms
    {
        //create
        ExProgram CreateProgram(string id, string username, string progrName);
        Day CreateDay(string id, int programId, string dayName);
        Exercise CreateExercise(string id, int dayId, string excName, int setsNumber);

        //edit
        void EditProgram(string id, int programId, string programName);
        void EditDay(string id, int dayId, string dayName);
        void EditExercise(string id, int exerciseId, string exerciseName, int setsAmount);

        //delete
        void DeleteProgram(string id, int programId);
        void DeleteDay(string id, int dayId);
        void DeleteExercise(string id, int exerciseId);
    }
}
