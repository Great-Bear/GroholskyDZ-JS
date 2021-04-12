

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    [Table("ProgressStudy")]
    class ProgressStudy : ITable
    {
        public int ID { get; set; }
        [Required]
        public int ID_Specialist { get; set; }
        [Required]
        public int ID_Subjects { get; set; }
        [Required]
        public int ID_Group { get; set; }
        [Required]
        [Range(0,9999)]
        public int CountHours { get; set; }

        [ForeignKey("ID_Specialist")]
        public virtual Specialist Specialists { get; set; }

        [ForeignKey("ID_Subjects")]
        public virtual Subject Subjects { get; set; }

        [ForeignKey("ID_Group")]
        public virtual Group Groups { get; set; }

        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID_Specialist", "ID_Subjects", "ID_Group", "CountHours"};

        public ProgressStudy()
        {

        }
        public ProgressStudy(int id_Specialist, int id_Subjects, int id_Group,int countHours)
        {
            ID_Specialist = id_Specialist;
            ID_Subjects = id_Subjects;
            ID_Group = id_Group;
            CountHours = countHours;
        }
        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID_Specialist:
                    return ID_Specialist.ToString();

                case (int)IndexProperty.ID_Subjects:
                    return ID_Subjects.ToString();

                case (int)IndexProperty.ID_Group:
                    return ID_Group.ToString();

                case (int)IndexProperty.CountHours:
                    return CountHours.ToString();

            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 4; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.ID_Specialist:
                        ID_Specialist = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Subjects:
                        ID_Subjects = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Group:
                        ID_Group = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.CountHours:
                            CountHours = int.Parse(value[i]);
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {

            return new ProgressStudy(int.Parse(value[0]), int.Parse(value[1]), int.Parse(value[2]), int.Parse(value[3]));
        }
        enum IndexProperty
        {
            ID_Specialist,
            ID_Subjects,
            ID_Group,
            CountHours,
        }
    }
}
