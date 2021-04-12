using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;



namespace CA_STEP.Classes.Tables
{
    public class ContactsBranche :  ITable
    {
        public int ID { get; set; }
        [Required]
        public int ID_Branches { get; set; }
        [MaxLength(50)]
        [Required]
        public string Web_Site { get; set; }
        [MaxLength(20)]
        [Required]
        public string Phone { get; set; }

        [ForeignKey("ID_Branches")]
        public virtual Branche Branches { get; set; }
        public ContactsBranche()
        {

        }
        public ContactsBranche(int id_Branches, string web_Site, string phone)
        {
            ID_Branches = id_Branches;
            Web_Site = web_Site;
            Phone = phone;
        }
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID_Branches", "Web_Site", "Phone" };

        public string TakeProperty(int idProp)
        {
            switch (idProp)
            {
                case (int)IndexProperty.ID_Branches:
                    return ID_Branches.ToString();

                case (int)IndexProperty.Web_Site:
                    return Web_Site;

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
                    case (int)IndexProperty.ID_Branches:
                        int id;
                        if(Int32.TryParse(value[i], out id) == true)
                        {
                            ID_Branches = id;
                        }
                        else 
                        {
                            throw new FormatException();
                        }                      
                        break;
                    case (int)IndexProperty.Web_Site:
                        Web_Site = value[i];
                        break;

                    case (int)IndexProperty.Phone:
                        Phone = value[i];
                        break;

                }
            }
        }
        public object CreateNewElem(List<string> value)
        {
            return new ContactsBranche(Int32.Parse(value[0]), value[1], value[2]);
        }

        enum IndexProperty
        {
            ID_Branches,
            Web_Site,
            Phone,
        }


    }
}
