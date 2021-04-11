using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace CA_STEP.Classes
{
    class ViewModels : INotifyPropertyChanged
    {
        private ObservableCollection<Branche> _branches;
        public ObservableCollection<Branche> Branches 
        {
            get => _branches;
            set
            {
                _branches = value;
                OnPropertyChanged("Branches");
            } 
        }
        public ObservableCollection<ContactsBranches> ContactsBranches { get; set; }
        public ObservableCollection<Position> Position { get; set; }
        public ObservableCollection<Workers> Workers { get; set; }
        public ObservableCollection<Specialists> Specialists { get; set; }
        public ObservableCollection<Subjects> Subjects { get; set; }
        public ObservableCollection<NameCourses> NameCourses { get; set; }


        public List<string> NamesBranches { get; set; }
        public ModelConectDB ConectDB { get; set; }
        public ViewModels()
        {
            ConectDB = new ModelConectDB();
            Branches = new ObservableCollection<Branche>(ConectDB.Branches.ToListAsync().Result);
            ContactsBranches = new ObservableCollection<ContactsBranches>(ConectDB.ContactsBranches.ToListAsync().Result);
            Position = new ObservableCollection<Position>(ConectDB.Positions.ToListAsync().Result);
            Workers = new ObservableCollection<Workers>(ConectDB.Workers.ToListAsync().Result);
            Specialists = new ObservableCollection<Specialists>(ConectDB.Specialists.ToListAsync().Result);
            Subjects = new ObservableCollection<Subjects>(ConectDB.Subjects.ToListAsync().Result);
            NameCourses = new ObservableCollection<NameCourses>(ConectDB.NameCourses.ToListAsync().Result);
            NamesBranches = ConectDB.NameTables;
        }   
        public void Remove(int indexTable,int indexRow)
        {
             ConectDB.Remove(indexTable,indexRow);
             UpdateCurrentTable(indexTable);
        }

        public void UpdateCurrentTable(int indexTable)
        {
           
            switch (indexTable)
            {
                case (int)IndexTable.Branches:
                    Branches = new ObservableCollection<Branche>(ConectDB.Branches.ToListAsync().Result);
                    break;

                case (int)IndexTable.ContactsBranches:
                    ContactsBranches = new ObservableCollection<ContactsBranches>(ConectDB.ContactsBranches.ToListAsync().Result);
                    break;

                case (int)IndexTable.Positions:
                    Position = new ObservableCollection<Position>(ConectDB.Positions.ToListAsync().Result);
                    break;

                case (int)IndexTable.Workers:
                    Workers = new ObservableCollection<Workers>(ConectDB.Workers.ToListAsync().Result);
                    break;

                case (int)IndexTable.Specialists:
                    Specialists = new ObservableCollection<Specialists>(ConectDB.Specialists.ToListAsync().Result);
                    break;

                case (int)IndexTable.Subjects:
                    Subjects = new ObservableCollection<Subjects>(ConectDB.Subjects.ToListAsync().Result);
                    break;
                case (int)IndexTable.NameCourses:
                    NameCourses = new ObservableCollection<NameCourses>(ConectDB.NameCourses.ToListAsync().Result);
                    break;
            }
        }

        public List<string> TakeCurrectNameColums(int indexTable)
        {
            switch (indexTable)
            {
                case (int)IndexTable.Branches:
                    return Classes.Tables.Branche.NameColums;

                case (int)IndexTable.ContactsBranches:
                    return Classes.Tables.ContactsBranches.NameColums;

                case (int)IndexTable.Positions:
                    return Classes.Tables.Position.NameColums;

                case (int)IndexTable.Workers:
                    return Classes.Tables.Workers.NameColums;

                case (int)IndexTable.Specialists:
                    return Classes.Tables.Specialists.NameColums;

                case (int)IndexTable.Subjects:
                    return Classes.Tables.Subjects.NameColums;

                case (int)IndexTable.NameCourses:
                    return Classes.Tables.NameCourses.NameColums;
            }           
            return null;
        }
        public void AddNewItem(int idTable, List<string> values)
        {
            ConectDB.AddNewItem(idTable, values);
            UpdateCurrentTable(idTable);
        }
        public void EditNewItem(int idTable, List<string> values)
        {
            ConectDB.EditNewItem(idTable, values);
            UpdateCurrentTable(idTable);
        }
        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
       
    }
}
