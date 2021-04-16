using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Subject : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { set; get; }
        [Required]
        [MaxLength(50)]
        public string Name { set; get; }
        [NotMapped]
        public static List<string> NameColums { get; set; } = new List<string> { "ID", "Name" };
        public Subject()
        {

        }
        public Subject(string name)
        {
            Name = name;
        }
        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.Name:
                    return Name;
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            Name = value[1];
        }
        public object CreateNewElem(List<string> value)
        {
            return new Subject(value[0]);
        }
        public static int CountProp()
        {
            return 2;
        }
        enum IndexProperty
        {
            ID,
            Name,
        }
    }
}
