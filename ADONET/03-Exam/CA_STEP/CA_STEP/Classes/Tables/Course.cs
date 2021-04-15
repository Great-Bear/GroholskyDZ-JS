using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Course : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        [NotMapped]
        public string ID__NameCourse
        {
            get
            {
                return $"{NameCourses.Name}";
            }
        }
        [NotMapped]
        public string ID__Subject
        {
            get
            {
                return $"{Subjects.Name}";
            }
        }

        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID", "ID__NameCourse", "ID__Subject", "CountHours", "Describe" };

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
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.ID_NameCourse:
                    return ID_NameCourse.ToString();

                case (int)IndexProperty.ID_Subject:
                    return ID_Subject.ToString();

                case (int)IndexProperty.CountHours:
                    return CountHours.ToString();

                case (int)IndexProperty.Describe:
                    return Describe;

            }
            return "";
        }
        public string TakeNavigationProperty(int idProp)
        {
            switch (idProp)
            {
                case 1:
                    return ID__NameCourse.ToString();

                case 2:
                    return ID__Subject.ToString();
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 5; i++)
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
            ID,
            ID_NameCourse,
            ID_Subject,
            CountHours,
            Describe,
        }
    }
}
