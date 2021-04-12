using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Worker :  ITable
    {
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        [MaxLength(50)]
        [Required]
        public string SurName { get; set; }
        public Nullable<DateTime> DataBirth { get; set; }
        [Required]
        public DateTime EmploymentDate { get; set; }
        public Nullable<DateTime>  DismissalDate { get; set; }
        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> { "Name", "SurName", "DataBirth", "EmploymentDate", "DismissalDate" };
        public Worker()
        {

        }
        public Worker(string name,string surname, Nullable<DateTime> dataBirth,DateTime employmentDate, Nullable<DateTime> dismissalDate)
        {
            Name = name;
            SurName = surname;
            DataBirth = dataBirth;
            EmploymentDate = employmentDate;
            DismissalDate = dismissalDate;
        }
        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.Name:
                    return Name;

                case (int)IndexProperty.SurName:
                    return SurName;

                case (int)IndexProperty.DataBirth:
                    return DataBirth.ToString();

                case (int)IndexProperty.EmploymentDate:
                    return EmploymentDate.ToString();

                case (int)IndexProperty.DismissalDate:
                    return DismissalDate.ToString();

            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 3; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.Name:
                        Name = value[i];
                        break;

                    case (int)IndexProperty.SurName:
                        SurName = value[i];
                        break;

                    case (int)IndexProperty.DataBirth:
                        DataBirth = DateTime.Parse(value[i]);
                        break;

                    case (int)IndexProperty.EmploymentDate:
                        EmploymentDate = DateTime.Parse(value[i]);
                        break;

                    case (int)IndexProperty.DismissalDate:
                        DismissalDate = DateTime.Parse(value[i]);
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            Nullable<DateTime> dismissalDate = new Nullable<DateTime>();
            Nullable<DateTime> dataBirth = new Nullable<DateTime>();
            if (value[4] == null)
            {
                dismissalDate = null;
            }
            else
            {
                dismissalDate = DateTime.Parse(value[4]);
            }
            if (value[2] == null)
            {
                dataBirth = null;
            }
            else
            {
                dataBirth = DateTime.Parse(value[2]);
            }

            return new Worker(value[0], value[1], dataBirth, DateTime.Parse(value[3]), dismissalDate);
        }

        enum IndexProperty
        {
            Name,
            SurName,
            DataBirth,
            EmploymentDate,
            DismissalDate,
        }
    }
}
