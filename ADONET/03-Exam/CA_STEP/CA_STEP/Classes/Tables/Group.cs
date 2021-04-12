using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{

    class Group : ITable
    {
        public int ID { get; set; }
        [Required]
        public int ID_Client { get; set; }
        [Required]
        public int ID_Course { get; set; }
        [Required]
        public int ID_NameGroups { get; set; }

        [ForeignKey("ID_Client")]
        public virtual Client Clients { get; set; }

        [ForeignKey("ID_Course")]
        public virtual Course Courses { get; set; }

        [ForeignKey("ID_NameGroups")]
        public virtual NameGroup NameGroups { get; set; }

        [NotMapped]
        public static List<string> NameColums { get; set; } =
                new List<string> { "ID_Client", "ID_Course", "ID_NameGroups" };
        public Group()
        {

        }
        public Group(int id_Client, int id_Course, int id_NameGroups)
        {
            ID_Client = id_Client;
            ID_Course = id_Course;
            ID_NameGroups = id_NameGroups;
        }

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID_Client:
                    return ID_Client.ToString();

                case (int)IndexProperty.ID_Course:
                    return ID_Course.ToString();

                case (int)IndexProperty.ID_NameGroups:
                    return ID_NameGroups.ToString();

            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 3; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.ID_Client:
                        ID_Client = int.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Course:
                        ID_Course = int.Parse(value[i]);
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


        enum IndexProperty
        {
            ID_Client,
            ID_Course,
            ID_NameGroups,
        }
    }
}
