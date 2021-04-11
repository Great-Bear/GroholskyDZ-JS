using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    class Branche : ITable
    {
        public int ID { get; set; }
        [MaxLength(50)]
        public string Country { get; set; }
        [MaxLength(50)]
        public string City { get; set; }
        [MaxLength(50)]
        public string Street { get; set; }
        public static List<string> NameColums { get; set; } =
                  new List<string> { "Country", "City", "Street" };

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
                case (int)IndexProperty.Country:
                    return Country;

                case (int)IndexProperty.City:
                    return City;

                case (int)IndexProperty.Street:
                    return Street;

            }
            return " ";
        }
        public void EditItem(object item,int idProp, string value)
        {
            switch (idProp)
            {
                case (int)IndexProperty.Country:
                    ((Branche)item).Country = value;
                    break;

                case (int)IndexProperty.City:
                    ((Branche)item).City = value;
                    break;

                case (int)IndexProperty.Street:
                    ((Branche)item).Street = value;
                    break;

            }
        }

        enum IndexProperty 
        {
            Country,
            City,
            Street,
        }
    }
}
