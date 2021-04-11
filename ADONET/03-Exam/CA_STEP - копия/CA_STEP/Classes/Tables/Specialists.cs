using System;
using System.Collections.Generic;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    /*
     ID INT PRIMARY KEY IDENTITY,
ID_Branches INT REFERENCES Branches (ID) ON DELETE CASCADE,
ID_Workers INT REFERENCES Workers (ID) ,
ID_Position INT REFERENCES Position (ID),
     */
    class Specialists : ITable
    {
        public int ID { get; set; }
        public int ID_Branches { get; set; }
        public int ID_Workers { get; set; }
        public int ID_Position { get; set; }
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID_Branches", "ID_Workers", "ID_Position"};

    }
}
