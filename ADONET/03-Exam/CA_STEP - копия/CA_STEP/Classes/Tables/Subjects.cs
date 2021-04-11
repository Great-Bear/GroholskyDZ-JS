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
    class Subjects : ITable
    {
        public int ID { set; get; }
        [Required]
        [MaxLength(50)]
        public string Name { set; get; }
        public static List<string> NameColums { get; set; } = new List<string> { "Name" };
        public Subjects()
        {

        }
        public Subjects(string name)
        {
            Name = name;
        }
    }
}
