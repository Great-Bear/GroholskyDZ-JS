using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;

namespace XML_LINQ.Code
{
    class ViewModel: INotifyPropertyChanged
    {
        private ObservableCollection<string> _typeSearch = new ObservableCollection<string>();
        public ObservableCollection<string> TypeSearch
        { 
            get 
            {
                return _typeSearch;
            }
            set 
            {
                _typeSearch = value;
                OnPropertyChanged("TypeSearch");
            }
        }
        private string _selectedTypeSearch;
        public string SelectedTypeSearch{ 
            get 
            {
                return _selectedTypeSearch;
            } 
            set 
            {
                _selectedTypeSearch = value;
                OnPropertyChanged("SelectedTypeSearch");
            }
        }

        private ObservableCollection<string> _foundStones = new ObservableCollection<string>();
        public ObservableCollection<string> FoundStones 
        {
            get 
            {
                return _foundStones;
            }
            set 
            {
                _foundStones = value;
                OnPropertyChanged("FoundStones");
            }
        }

        private Model ModelObj = new Model(@"PreciousStones.xml");
        public ViewModel()
        {
            LoadTypeSearch();
        }
        public void SearchStone(string value)
        {
            FoundStones.Clear();
            if(value.Length == 0) 
            {
                FoundStones.Add("value is empty");
                return;
            }
            foreach (var item in ModelObj.FindElemValueElem(SelectedTypeSearch, value))
            {
                FoundStones.Add(item);
            }
        }

        private void LoadTypeSearch()
        {
            foreach(string typeS in ModelObj.FindElements()) 
            {
                if(string.Compare(typeS,"name",true) == 0)
                {
                    continue;
                }
                TypeSearch.Add(typeS);
            }
            SelectedTypeSearch = TypeSearch[0];
        }

        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
    }
}
