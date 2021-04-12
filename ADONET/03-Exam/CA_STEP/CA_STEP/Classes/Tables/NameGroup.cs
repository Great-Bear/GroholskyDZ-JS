using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class NameGroup : ITable
    {
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        public NameGroup()
        {

        }
        public NameGroup(string name)
        {
            Name = name;
        }
        public static List<string> NameColums { get; set; } = new List<string> { "Name" };

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
            return new NameGroup(value[0]);
        }
        enum IndexProperty
        {
            Name,
        }
    }
}
