using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    [Table("Position")]
    class Position :  ITable
    {
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal RateHour { get; set; }

        public Position()
        {

        }
        public Position(string name,decimal rateHour)
        {
            Name = name;
            RateHour = rateHour;
        }
        public static List<string> NameColums { get; set; } =
                  new List<string> { "Name", "RateHour"};
    }
}
