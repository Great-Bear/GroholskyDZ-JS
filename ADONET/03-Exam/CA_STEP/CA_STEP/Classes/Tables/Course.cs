using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Course : ITable
    {
        public int ID { get; set; }
        [Required]
        public int ID_NameCourse { get; set; }
        [Required]
        public int ID_Subject { get; set; }
        [Required]
        [Range(0,9999)]
        public int CountHours { get; set; }
        public string Describe { get; set; }

        [ForeignKey("ID_NameCourse")]
        public virtual NameCourse NameCourses { get; set; }

        [ForeignKey("ID_Subject")]
        public virtual Subject Subjects { get; set; }

        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID_NameCourse", "ID_Subject", "CountHours", "Describe" };

        public Course()
        {

        }
        public Course(int id_NameCourse, int id_Subject, int countHours, string describe)
        {
            ID_NameCourse = id_NameCourse;
            ID_Subject = id_Subject;
            CountHours = countHours;
            Describe = describe;
        }

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID_NameCourse:
                    return ID_NameCourse.ToString();

                case (int)IndexProperty.ID_Subject:
                    return ID_Subject.ToString();

                case (int)IndexProperty.CountHours:
                    return CountHours.ToString();

                case (int)IndexProperty.Describe:
                    return Describe;

            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 4; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.ID_NameCourse:
                        ID_NameCourse = Int32.Parse(value[i]);
                        break;

                    case (int)IndexProperty.ID_Subject:
                        ID_Subject = Int32.Parse(value[i]);
                        break;

                    case (int)IndexProperty.CountHours:
                        CountHours = Int32.Parse(value[i]);
                        break;

                    case (int)IndexProperty.Describe:
                        Describe = value[i];
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            return new Course(Int32.Parse(value[0]), Int32.Parse(value[1]), Int32.Parse(value[2]), value[3]);
        }

        enum IndexProperty
        {
            ID_NameCourse,
            ID_Subject,
            CountHours,
            Describe,
        }
    }
}
