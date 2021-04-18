﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using System.Text;

namespace CA_STEP.Classes.Tables
{
    [Table("Position")]
    class Position :  IElementDB
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        
        [Required]
        [Column(TypeName = "money")]
        public decimal RateHour { get; set; }

        public Position()
        {

        }
        public Position(string name,decimal rateHour)
        {
            Name = name;
            RateHour = rateHour;
        }
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID","Name", "RateHour"};
        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID:
                    return ID.ToString();

                case (int)IndexProperty.Name:
                    return Name;

                case (int)IndexProperty.RateHour:
                    return RateHour.ToString();
            }
            return " ";
        }
        public void EditItem(List<string> value)
        {
            value[2] = value[2].Replace(',', '.');
            for (int i = 0; i < 3; i++)
            {
                switch (i)
                {
                    case (int)IndexProperty.Name:
                        Name = value[i];
                        break;

                    case (int)IndexProperty.RateHour:
                        RateHour = decimal.Parse(value[i], NumberStyles.AllowDecimalPoint, CultureInfo.CreateSpecificCulture("en-GB"));
                        break;
                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            value[1] = value[1].Replace(',', '.');
            return new Position(value[0], decimal.Parse(value[1], NumberStyles.AllowDecimalPoint, CultureInfo.CreateSpecificCulture("en-GB")));
        }
        public static int CountProp()
        {
            return 2;
        }
        enum IndexProperty
        {
            ID,
            Name,
            RateHour,
        }
    }
}
