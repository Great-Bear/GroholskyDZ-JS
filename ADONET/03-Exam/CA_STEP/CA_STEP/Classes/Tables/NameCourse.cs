using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class NameCourse : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public static List<string> NameColums { get; set; } = new List<string> { "ID", "Name" };

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();            

                case (int)IndexProperty.Name:
                    return Name;
            }
            return string.Empty;
        }
        public void EditItem(List<string> value)
        {
           Name = value[0];
        }
        public object CreateNewElem(List<string> value)
        {
            return new NameCourse(value[0]);
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
