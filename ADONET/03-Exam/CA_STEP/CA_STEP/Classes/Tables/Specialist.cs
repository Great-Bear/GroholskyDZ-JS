using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Specialist : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public int ID_Branches { get; set; }
        [Required]
        public int ID_Workers { get; set; }
        [Required]
        public int ID_Position { get; set; }      

        [ForeignKey("ID_Branches")]
        public virtual Branche Branches { get; set; }

        [ForeignKey("ID_Workers")]
        public virtual Worker Workers { get; set; }

        [ForeignKey("ID_Position")]
        public virtual Position Positions { get; set; }
        [NotMapped]
        public string ID__Branches
        {
            get 
            {
                return $"{Branches.Country} {Branches.City} {Branches.Street}";
            }
        }
        [NotMapped]
        public string ID__Workers
        {
            get
            {
                return $"{Workers.Name} {Workers.SurName}";
            }
        }
        public string ID__Positions
        {
            get
            {
                return $"{Positions.Name}";
            }
        }

        [NotMapped]
        public static List<string> NameColums { get; set; } =
                 new List<string> { "ID", "ID__Branches", "ID__Workers", "ID__Positions" };

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
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.ID_Branches:
                    return ID__Workers.ToString();

                case (int)IndexProperty.ID_Workers:
                    return ID__Workers.ToString();

                case (int)IndexProperty.ID_Position:
                    return ID_Position.ToString();
            }
            return " ";
        }
        public string TakeNavigationProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexNavigationProperty.ID__Branches:
                    return ID__Branches.ToString();

                case (int)IndexNavigationProperty.ID__Position:
                    return ID__Positions.ToString();

                case (int)IndexNavigationProperty.ID__Workers:
                    return ID__Workers.ToString();
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 4; i++)
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
        public static int CountProp()
        {
            return 2;
        }
        enum IndexProperty
        {
            ID,
            ID_Branches,
            ID_Workers,
            ID_Position,
        }
        enum IndexNavigationProperty
        {
            ID,
            ID__Branches,
            ID__Workers,
            ID__Position,
        }

    }
}
