using System;
using System.Collections.Generic;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    interface ITable
    {
        public int ID { get; set; }

        public string TakeProperty(int idProp);

        public void EditItem(List<string> value);

        public object CreateNewElem(List<string> value);

        public static List<string> NameColums { get; set; } = new List<string> { "Name" };
        public int TaleNum()
        {
            return 1;
        }

    }
}
