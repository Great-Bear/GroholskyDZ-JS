using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;

namespace CA_STEP.Classes
{
    partial class ViewModels : INotifyPropertyChanged
    {
        public List<string> NamesTables { get; set; }
        public ModelConectDB ConectDB { get; set; }

        private ObservableCollection<object> _currentList = new ObservableCollection<object>();
        public ObservableCollection<object> CurrentList
        {
            get
            {
                return _currentList;
            }
            set
            {
                _currentList = value;
                OnPropertyChanged("CurrentList");
            }
        }
        private List<string> _currectNameColums = new List<string>();
        public List<string> CurrectNameColums
        {
            get
            {
                return _currectNameColums;
            }

            set
            {
                _currectNameColums = value;
                OnPropertyChanged("CurrectNameColums");
            }
        }
        public event PropertyChangedEventHandler PropertyChanged;
        public List<int> CountPropTables { set; get; } = new List<int>();
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
    }
}
