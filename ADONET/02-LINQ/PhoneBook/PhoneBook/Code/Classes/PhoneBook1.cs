using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;

namespace PhoneBook
{
    class PhoneBook1
    {
        public string PathFileContacs { get; set; } = "Contacts.FGB";
        public List<Contact> Contacts { get; set; }

        public PhoneBook1()
        {
            Contacts = new List<Contact>();          
        }

        public void LoadContacts() 
        {
            // code load;
            BinaryFormatter formatter = new BinaryFormatter();
            using (FileStream fs = new FileStream(PathFileContacs, FileMode.OpenOrCreate))
            {
                List<Contact> deserilizeContacts = (List<Contact>)formatter.Deserialize(fs);

                foreach (var contact in deserilizeContacts)
                {
                    Contacts.Add(contact);
                }
            }
        }
        const uint cSortByName = 0;
        const uint cSortByNumber = 1;

        const uint cSortAscending = 0;
        const uint cSortdescending = 1;
        public List<Contact> Sort(uint sortById,uint optionSort) 
        {
            IEnumerable<Contact> sortedContacts = null;
            if (sortById == cSortByName)
            {        
                if (optionSort == cSortAscending)
                {
                    sortedContacts = Contacts.OrderBy(u => u.Name);
                }
                else
                {
                    sortedContacts = Contacts.OrderByDescending(u => u.Name);
                }
            }
            else 
            {
                if (optionSort == cSortAscending)
                {
                    sortedContacts = Contacts.OrderBy(u => u.Number);
                }
                else
                {
                    sortedContacts = Contacts.OrderByDescending(u => u.Number);
                }
            }

            return Contacts = sortedContacts.ToList();
        }
        public List<Contact> ChangeContact(uint contactId, string name, string number) 
        {
            Contacts = new List<Contact>(Contacts);
            Contacts[(int)contactId].Name = name;
            Contacts[(int)contactId].Number = number;
            return Contacts;
        }
        public List<Contact> AddNewContact(string name, string number) 
        {
            Contacts = new List<Contact>(Contacts);
            Contacts.Add(new Contact(number,name));
            return Contacts;
        }
        public List<Contact> DeleteContact(ushort idContact) 
        {
            Contacts = new List<Contact>(Contacts);
            Contacts.RemoveAt(idContact);
            return Contacts;
        }
        public void SaveContacts() 
        {
            BinaryFormatter formatter = new BinaryFormatter();
            using (FileStream fs = new FileStream(PathFileContacs, FileMode.Create))
            {
                formatter.Serialize(fs, Contacts);
            }
        }
    }
}
