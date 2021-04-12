using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Subject : ITable
    {
        public int ID { set; get; }
        [Required]
        [MaxLength(50)]
        public string Name { set; get; }
        [NotMapped]
        public static List<string> NameColums { get; set; } = new List<string> { "Name" };
        public Subject()
        {

        }
        public Subject(string name)
        {
            Name = name;
        }
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
            return new Subject(value[0]);
        }
        enum IndexProperty
        {
            Name,
        }
    }
}
