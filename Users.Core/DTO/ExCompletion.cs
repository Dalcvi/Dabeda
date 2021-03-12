using System;
using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class ExCompletion
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Exercise Exercise { get; set; }
        public ICollection<Set> Sets { get; set; }
    }
}
