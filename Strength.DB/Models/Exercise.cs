using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Strength.DB.Models
{
    public class Exercise
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int SetsNumer { get; set; }
        public Day Day { get; set; }
        public ICollection<ExCompletion> Completions { get; set; }
    }
}
