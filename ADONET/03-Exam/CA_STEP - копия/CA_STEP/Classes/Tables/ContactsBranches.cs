using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;



namespace CA_STEP.Classes.Tables
{
    class ContactsBranches :  ITable
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
        public ContactsBranches()
        {

        }
        public ContactsBranches(int id_Branches, string web_Site, string phone)
        {
            ID_Branches = id_Branches;
            Web_Site = web_Site;
            Phone = phone;
        }
        public static List<string> NameColums { get; set; } =
                  new List<string> { "ID_Branches", "Web_Site", "Phone" };

    }
}
