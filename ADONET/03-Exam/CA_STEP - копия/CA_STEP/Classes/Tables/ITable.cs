using System;
using System.Collections.Generic;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    interface ITable
    {
        public int ID { get; set; }
        public static List<string> NameColums { get; set; }

        public string TakeProperty(int idProp)
        {
            return " ";
        }
        public void EditItem(object item,int idProp, string value) { }


    }
}
