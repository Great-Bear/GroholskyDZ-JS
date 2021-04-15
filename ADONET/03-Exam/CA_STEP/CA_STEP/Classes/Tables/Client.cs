using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Client : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Name { get; set; }
        [MaxLength(50)]
        [Required]
        public string SurName { get; set; }
        [MaxLength(50)]
        [Required]
        public string Phone { get; set; }
        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID","Name", "SurName", "Phone" };

        public Client()
        {

        }
        public Client(string name, string surName, string phone)
        {
            Name = name;
            SurName = surName;
            Phone = phone;
        }

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.Name:
                    return Name;

                case (int)IndexProperty.SurName:
                    return SurName;

                case (int)IndexProperty.Phone:
                    return Phone;

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

                    case (int)IndexProperty.Phone:
                        Phone = value[i];
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            return new Client(value[0], value[1], value[2]);
        }


        enum IndexProperty
        {
            ID,
            Name,
            SurName,
            Phone,
        }
    }
}
