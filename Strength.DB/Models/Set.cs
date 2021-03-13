using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Strength.DB.Models
{
    public class Set
    {
        [Key]
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
