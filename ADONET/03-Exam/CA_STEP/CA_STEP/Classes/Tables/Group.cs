using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{

    class Group : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public int ID_Client { get; set; }

        [Required]
        public int ID_NameCourse { get; set; }

        [Required]
        public int ID_NameGroups { get; set; }

        [ForeignKey("ID_Client")]
        public virtual Client Clients { get; set; }

        [ForeignKey("ID_NameCourse")]
        public virtual NameCourse NameCourses { get; set; }

        [ForeignKey("ID_NameGroups")]
        public virtual NameGroup NameGroups { get; set; }
        [NotMapped]
        public string ID__Clients
        {
            get
            {
                return $"{Clients.Name} {Clients.SurName}";
            }
        }
        [NotMapped]
        public string ID__NameGroups
        {
            get
            {
                return $"{NameGroups.Name}";
            }
        }
        [NotMapped]
        public string ID__Courses
        {
            get
            {
                return $"{NameCourses.Name}";
            }
        }

        [NotMapped]
        public static List<string> NameColums { get; set; } =
                new List<string> { "ID","ID__Clients", "ID__Courses", "ID__NameGroups" };
        public Group()
        {

        }
        public Group(int id_Client, int id_Course, int id_NameGroups)
        {
            ID_Client = id_Client;
            ID_NameCourse = id_Course;
            ID_NameGroups = id_NameGroups;
        }

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.ID_Client:
                    return NameGroups.Name.ToString();

                case (int)IndexProperty.ID_Course:
                    return NameGroups.Name.ToString();

                case (int)IndexProperty.ID_NameGroups:
                    return ID_NameGroups.ToString();

            }
            return " ";
        }
        public string TakeNavigationProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexNavigationProperty.ID__Client:
                    return ID__Clients.ToString();

                case (int)IndexNavigationProperty.ID__Course:
                    return ID__Courses.ToString();

                case (int)IndexNavigationProperty.ID__NameGroup:
                    return ID__NameGroups.ToString();
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 4; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.ID_Client:
                        ID_Client = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Course:
                        ID_NameCourse = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_NameGroups:
                        ID_NameGroups = int.Parse(value[i]);
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            return new Group(int.Parse(value[0]), int.Parse(value[1]), int.Parse(value[2]));
        }

        public static int CountProp()
        {
            return 2;
        }
        enum IndexProperty
        {
            ID,
            ID_Client,
            ID_Course,
            ID_NameGroups,
        }
        enum IndexNavigationProperty
        {
            ID,
            ID__Client,
            ID__Course,
            ID__NameGroup,
        }
    }
}
