using Newtonsoft.Json;
using System.Collections.Generic;

namespace Users.Core.DTO
{
    public class ExProgram
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ExProgram(Strength.DB.Models.ExProgram e)
        {
            Id = e.Id;
            Name = e.Name;
        }

        [JsonConstructor]
        public ExProgram(int id = 0, string name = null)
        {
            Id = id;
            Name = name;
        }
    }
}
