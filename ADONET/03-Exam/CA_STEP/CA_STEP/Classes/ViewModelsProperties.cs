using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Text;

namespace CA_STEP.Classes
{
    partial class ViewModels : INotifyPropertyChanged
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
        private ObservableCollection<ContactsBranche> _contactsBranches;
        public ObservableCollection<ContactsBranche> ContactsBranches
        {
            get => _contactsBranches;
            set
            {
                _contactsBranches = value;
                OnPropertyChanged("ContactsBranches");
            }
        }
        private ObservableCollection<Position> _positions;
        public ObservableCollection<Position> Positions
        {
            get => _positions;
            set
            {
                _positions = value;
                OnPropertyChanged("Positions");
            }
        }
        private ObservableCollection<Worker> _workers;
        public ObservableCollection<Worker> Workers 
        {
            get => _workers;
            set
            {
                _workers = value;
                OnPropertyChanged("Workers");
            }
        }
        private ObservableCollection<Specialist> _specialists;
        public ObservableCollection<Specialist> Specialists 
        {
            get => _specialists;
            set
            {
                _specialists = value;
                OnPropertyChanged("Specialists");
            }
        }
        private ObservableCollection<Subject> _subjects;
        public ObservableCollection<Subject> Subjects 
        {
            get => _subjects;
            set
            {
                _subjects = value;
                OnPropertyChanged("Subjects");
            }
        }
        private ObservableCollection<NameCourse> _nameCourses;
        public ObservableCollection<NameCourse> NameCourses 
        {
            get => _nameCourses;
            set
            {
                _nameCourses = value;
                OnPropertyChanged("NameCourses");
            }
        }
        private ObservableCollection<Course> _courses;
        public ObservableCollection<Course> Courses 
        {
            get => _courses;
            set
            {
                _courses = value;
                OnPropertyChanged("Courses");
            }
        }
        private ObservableCollection<Client> _clients;
        public ObservableCollection<Client> Clients
        {
            get => _clients;
            set
            {
                _clients = value;
                OnPropertyChanged("Clients");
            }
        }
        private ObservableCollection<NameGroup> _nameGroups;
        public ObservableCollection<NameGroup> NameGroups 
        {
            get => _nameGroups;
            set
            {
                _nameGroups = value;
                OnPropertyChanged("NameGroups");
            }
        }
        private ObservableCollection<Group> _groups;
        public ObservableCollection<Group> Groups
        {
            get => _groups;
            set
            {
                _groups = value;
                OnPropertyChanged("Groups");
            }
        }
        private ObservableCollection<ProgressStudy> _progressStudy;
        public ObservableCollection<ProgressStudy> ProgressStudy
        {
            get => _progressStudy;
            set
            {
                _progressStudy = value;
                OnPropertyChanged("ProgressStudy");
            }
        }
        public List<string> NamesTables { get; set; }
        public ModelConectDB ConectDB { get; set; }
    }
}
