using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Workers :  ITable
    {
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        [MaxLength(50)]
        [Required]
        public string SurName { get; set; }
        public Nullable<DateTime> DataBirth { get; set; }
        public DateTime EmploymentDate { get; set; }
        public Nullable<DateTime>  DismissalDate { get; set; }
  
        public static List<string> NameColums { get; set; } =
                  new List<string> { "Name", "SurName", "DataBirth", "EmploymentDate", "DismissalDate" };
  
    }
}
