using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Windows.Input;

namespace CA_STEP.Classes.Tables
{
    interface IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string TakeProperty(int idProp);
        public string TakeNavigationProperty(int idProp)
        {
            return " ";
        }

        public void EditItem(List<string> value);

        public  object CreateNewElem(List<string> value);

        public static List<string> NameColums { get; set; } = new List<string> { "ID", "Name" };

        public List<string> TakeNameColums() 
        {
            return NameColums;
        }
       // public int CountNavigationProperty { get; set; }

        public static int CountProp()
        {
            return 0;
        }

        public bool Where(string valueItem, string value)
        {
           
            if (valueItem.ToUpper() == value.ToUpper())
            {
                return true;
            }
            return false;
        }
    }
}
