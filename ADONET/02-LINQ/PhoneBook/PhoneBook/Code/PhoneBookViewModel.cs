using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBook
{
    class PhoneBookViewModel : INotifyPropertyChanged
    {
       private List<Contact> _contacts = new List<Contact>();
       public List<Contact> Contacts 
       {
            set 
            {
                _contacts = value;
                OnPropertyChanged("Contacts");
            }
            get 
            {
                return _contacts;
            }
       }  
        public PhoneBook1 PhoneBook { get; set; } = new PhoneBook1();

        public PhoneBookViewModel()
        {
            PhoneBook.LoadContacts();
            Contacts = PhoneBook.Contacts;
        }

        public void Sort(uint sortById, uint optionSort)
        {
            Contacts = PhoneBook.Sort(sortById, optionSort);
        }
        public void ChangeContact(uint contactId, string name, string number)  
        {
           Contacts = PhoneBook.ChangeContact(contactId,name,number);
        }
        public void AddNewContact(string name, string number) 
        {
            Contacts = PhoneBook.AddNewContact(name, number);
        }

        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
        public void DeleteContact(ushort idContact) 
        {
            Contacts = PhoneBook.DeleteContact(idContact);
        }
        public void SaveContacts() 
        {
            PhoneBook.SaveContacts();
        }


    }
}
