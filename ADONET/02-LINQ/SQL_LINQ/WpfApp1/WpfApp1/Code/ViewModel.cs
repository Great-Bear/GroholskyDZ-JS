using System;
using System.Runtime.CompilerServices;
using System.ComponentModel;
using System.Collections.ObjectModel;
using System.Windows.Controls;
using System.Collections.Generic;

namespace WpfApp1.Code
{
    public class ViewModel : INotifyPropertyChanged
    {    
        private ObservableCollection<DateTime> _listBox = new ObservableCollection<DateTime>();
        public ObservableCollection<DateTime> ListBox {
            get
            {
                return _listBox;
            }
            set 
            {
                _listBox = value;
                OnPropertyChanged("ListBox");
            }
        }
        public Model ModelObj { get; set; }

        private string _errMessageFound;
        public string ErrMessageFound 
        { 
            get
            {
                return _errMessageFound;
            } 
            set
            {
                _errMessageFound = value;
                OnPropertyChanged("ErrMessageFound");
            }
        }
        private List<string> _workersSurname = new List<string>();

        public List<string> WorkersSurname {
            get 
            {
                return _workersSurname;
            }
            set 
            {
                _workersSurname = value;
                OnPropertyChanged("WorkersSurname");
            }
        }
        public ViewModel()
        {
            ModelObj = new Model();
            WorkersSurname = ModelObj.FindAllWorkers();
        }
        public void ShowActivityWorkers(string surName)
        {
            ListBox.Clear();
            ErrMessageFound = "";
            if(ModelObj.ShowActivityWorker(surName) == null)
            {
                ErrMessageFound = "Unreal worker";
                return;
            }
            foreach(var date in ModelObj.ShowActivityWorker(surName)) 
            {
                ListBox.Add(date);
            }
        }
        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
    }
}
