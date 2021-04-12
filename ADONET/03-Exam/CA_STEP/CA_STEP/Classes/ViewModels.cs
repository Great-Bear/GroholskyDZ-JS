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
    partial class ViewModels : INotifyPropertyChanged
    {         
        public ViewModels()
        {
            ConectDB = new ModelConectDB();
            NamesTables = ConectDB.NameTables;
            for (int i = 0; i < ConectDB.NameTables.Count; i++)
            {
                UpdateCurrentTable(i);
            }
            
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
                    ContactsBranches = new ObservableCollection<ContactsBranche>(ConectDB.ContactsBranches.ToListAsync().Result);
                    break;

                case (int)IndexTable.Positions:
                    Positions = new ObservableCollection<Position>(ConectDB.Positions.ToListAsync().Result);
                    break;

                case (int)IndexTable.Workers:
                    Workers = new ObservableCollection<Worker>(ConectDB.Workers.ToListAsync().Result);
                    break;

                case (int)IndexTable.Specialists:
                    Specialists = new ObservableCollection<Specialist>(ConectDB.Specialists.ToListAsync().Result);
                    break;

                case (int)IndexTable.Subjects:
                    Subjects = new ObservableCollection<Subject>(ConectDB.Subjects.ToListAsync().Result);
                    break;

                case (int)IndexTable.NameCourses:
                    NameCourses = new ObservableCollection<NameCourse>(ConectDB.NameCourses.ToListAsync().Result);
                    break;

                case (int)IndexTable.Courses:
                    Courses = new ObservableCollection<Course>(ConectDB.Courses.ToListAsync().Result);
                    break;

                case (int)IndexTable.Clients:
                    Clients = new ObservableCollection<Client>(ConectDB.Clients.ToListAsync().Result);
                    break;

                case (int)IndexTable.NameGroups:
                    NameGroups = new ObservableCollection<NameGroup>(ConectDB.NameGroups.ToListAsync().Result);
                    break;

                case (int)IndexTable.Groups:
                    Groups = new ObservableCollection<Group>(ConectDB.Groups.ToListAsync().Result);
                    break;

                case (int)IndexTable.ProgressStudy:
                    ProgressStudy = new ObservableCollection<ProgressStudy>(ConectDB.ProgressStudys.ToListAsync().Result);
                    break;
            }
        }

        public List<string> TakeCurrectNameColums(int indexTable)
        {
           return ConectDB.NameColums[indexTable];         
        }
        public void AddNewItem(int idTable, List<string> values)
        {
            ConectDB.AddNewItem(idTable, values);
            UpdateCurrentTable(idTable);
        }
        public void EditItem(int idTable,int idElem, List<string> values)
        {
            ConectDB.EditNewItem(idTable, idElem, values);
            UpdateCurrentTable(idTable);
        }
        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
       
    }
}
