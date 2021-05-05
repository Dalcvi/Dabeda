// this class is used for saving exercises progress

using System;
using System.Collections.Generic;
using System.Text;

namespace Users.Core.DTO
{
    public class ReturnExercise
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public int Weight { get; set; }
        public int[] Reps { get; set; }
        public string Date { get; set; }
    }
}
