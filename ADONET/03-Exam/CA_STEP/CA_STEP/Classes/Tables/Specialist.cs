using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Specialist : ITable
    {
        public int ID { get; set; }
        [Required]
        public int ID_Branches { get; set; }
        [Required]
        public int ID_Workers { get; set; }
        [Required]
        public int ID_Position { get; set; }
        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID_Branches", "ID_Workers", "ID_Position"};

        [ForeignKey("ID_Branches")]
        public virtual Branche Branches { get; set; }

        [ForeignKey("ID_Workers")]
        public virtual Worker Workers { get; set; }

        [ForeignKey("ID_Position")]
        public virtual Position Positions { get; set; }

        public Specialist()
        {

        }
        public Specialist(int idBranche,int idWorker,int idPosition)
        {
            ID_Branches = idBranche;
            ID_Workers = idWorker;
            ID_Position = idPosition;
        }

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID_Branches:
                    return ID_Branches.ToString();

                case (int)IndexProperty.ID_Workers:
                    return ID_Workers.ToString();

                case (int)IndexProperty.ID_Position:
                    return ID_Position.ToString();
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 3; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.ID_Branches:
                        ID_Branches = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Workers:
                        ID_Workers = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Position:
                        ID_Position = int.Parse(value[i]);
                        break;
                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            return new Specialist(int.Parse(value[0]), int.Parse(value[1]), int.Parse(value[2]));
        }
        enum IndexProperty
        {
            ID_Branches,
            ID_Workers,
            ID_Position,
        }

    }
}
