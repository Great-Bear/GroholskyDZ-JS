using System;
using System.Runtime.CompilerServices;
using System.ComponentModel;
using System.Collections.ObjectModel;

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
        public ViewModel()
        {
            ModelObj = new Model();
        }
        public void ShowActivityWorkers(string surName)
        {
            ListBox.Clear();
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
