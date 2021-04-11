using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    /*
     ID INT PRIMARY KEY IDENTITY,
        Name NVARCHAR(50) NOT NULL UNIQUE
     */
    class NameCourses : ITable
    {
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        public NameCourses()
        {

        }
        public NameCourses(string name)
        {
            Name = name;
        }
        public static List<string> NameColums { get; set; } = new List<string> { "Name"};
    }
}
