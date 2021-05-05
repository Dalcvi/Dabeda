using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class ExCompletion
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public Exercise Exercise { get; set; }
        public int Weight { get; set; }
        public string Reps { get; set; }


        [JsonConstructor]
        public ExCompletion(int id = 0, DateTime? date = null, int weight = 0, string reps = null, Exercise exercise = null)
        {
            Id = id;
            Date = date;
            Exercise = exercise;
            Weight = weight;
            Reps = reps;
        }
    }
}
