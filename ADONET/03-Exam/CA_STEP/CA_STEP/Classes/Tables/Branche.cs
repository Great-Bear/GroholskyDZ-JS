using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Windows;

namespace CA_STEP.Classes.Tables
{
    public class Branche : IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [MaxLength(50)]
        [Required]
        public string Country { get; set; }
        [MaxLength(50)]
        [Required]
        public string City { get; set; }
        [MaxLength(50)]
        [Required]
        public string Street { get; set; }
        [NotMapped]
        public static List<string> NameColums { get; set; } =
                  new List<string> {"ID","Country", "City", "Street" };

        public Branche()
        {
        }
        public Branche(string country,string city,string street)
        {
            Country = country;
            City = city;
            Street = street;
        }

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.Country:
                    return Country;

                case (int)IndexProperty.City:
                    return City;

                case (int)IndexProperty.Street:
                    return Street;

            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            for (int i = 0; i < 3; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.Country:
                        Country = value[i];
                        break;

                    case (int)IndexProperty.City:
                        City = value[i];
                        break;

                    case (int)IndexProperty.Street:
                        Street = value[i];
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value) 
        {
            return new Branche(value[0],value[1],value[2]);
        }
        public bool Where(int idProp,string value)
        {
            if(TakeProperty(idProp) == value)
            {
                return true;
            }
            return false;
        }
        public static int CountProp()
        {
            return 4;
        }
        enum IndexProperty 
        {
            ID,
            Country,
            City,
            Street,
        }
    }
}
