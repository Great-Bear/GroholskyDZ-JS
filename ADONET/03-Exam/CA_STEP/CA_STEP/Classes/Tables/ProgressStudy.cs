

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    [Table("ProgressStudy")]
    class ProgressStudy : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public int ID_Specialist { get; set; }
        [Required]
        public int ID_Group { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        [Range(0,9999)]
        public int CountHours { get; set; }

        [ForeignKey("ID_Specialist")]
        public virtual Specialist Specialists { get; set; }

        [ForeignKey("ID_Group")]
        public virtual NameGroup Groups { get; set; }
        [NotMapped]
        public string ID__Specialists
        {
            get
            {
                return $"{Specialists.Workers.Name} {Specialists.Workers.SurName}";
            }
        }
        [NotMapped]
        public string ID__NameGroups
        {
            get
            {
                return $"{Groups.Name}";
            }
        }


        [NotMapped]
        public string Specialist
        {
            get
            {
                return $"{Specialists.Workers.SurName} {Specialists.Workers.Name}";
            }
        }
        [NotMapped]
        public string Group
        {
            get
            {
                return $"{Groups.Name}";
            }
        }

        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID","ID__Specialists", "ID__NameGroups", "Subject", "CountHours"};

        public ProgressStudy()
        {

        }
        public ProgressStudy(int id_Specialist, int id_Group,string subject, int countHours)
        {
            ID_Specialist = id_Specialist;
            ID_Group = id_Group;
            Subject = subject;
            CountHours = countHours;
        }
        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.ID_Specialist:
                    return ID_Specialist.ToString();

                case (int)IndexProperty.ID_Group:
                    return ID_Group.ToString();

                case (int)IndexProperty.Subject:
                    return Subject;

                case (int)IndexProperty.CountHours:
                    return CountHours.ToString();

            }
            return " ";
        }
        public string TakeNavigationProperty(int idProp)
        {
            switch (idProp)
            {

                case (int)IndexNavigationProperty.ID__Group:
                    return ID__NameGroups.ToString();

                case (int)IndexNavigationProperty.ID__Specialist:
                    return ID__Specialists.ToString();
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 5; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.ID_Specialist:
                        ID_Specialist = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Group:
                        ID_Group = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.Subject:
                        Subject = value[i];
                        break;

                    case (int)IndexProperty.CountHours:
                        CountHours = int.Parse(value[i]);
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            return new ProgressStudy(int.Parse(value[0]), int.Parse(value[1]),value[2], int.Parse(value[3]));
        }
        public static int CountProp()
        {
            return 5;
        }
        enum IndexProperty
        {
            ID,
            ID_Specialist,
            ID_Group,
            Subject,
            CountHours,
        }
        enum IndexNavigationProperty
        {
            ID,
            ID__Specialist,
            ID__Group,
        }
    }
}
