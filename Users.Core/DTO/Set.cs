using System.ComponentModel.DataAnnotations.Schema;

namespace Users.Core.DTO
{
    public class Set
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int Reps { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
#nullable enable
        public decimal? Weight { get; set; }
#nullable disable
        public ExCompletion ExCompletion { get; set; }
    }
}
