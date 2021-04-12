using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class NameCourse : ITable
    {
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        public NameCourse()
        {

        }
        public NameCourse(string name)
        {
            Name = name;
        }
        [NotMapped]
        public static List<string> NameColums { get; set; } = new List<string> { "Name"};

        public string TakeProperty(int idProp)
        { 
             return Name;
        }
        public void EditItem(List<string> value)
        {
           Name = value[0];
        }
        public object CreateNewElem(List<string> value)
        {
            return new NameCourse(value[0]);
        }
        enum IndexProperty
        {
            Name,
        }
    }
}
