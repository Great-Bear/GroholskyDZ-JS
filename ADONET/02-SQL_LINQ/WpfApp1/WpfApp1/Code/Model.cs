using System;
using System.ComponentModel;
using System.Data.Linq;
using System.Linq;
using System.Runtime.CompilerServices;
using WpfApp1.Code.Classes;

namespace WpfApp1.Code
{
    public class Model : INotifyPropertyChanged
    {       
        public Model()
        {
            PathBD = "Data Source=(local);Initial Catalog=SQL_DB_LINQ;" +
                     "Integrated Security=SSPI;Pooling=False";
        }
        public string PathBD { get; set; }
        public DateTime[] ShowActivityWorker(string surName)
        {
            if (surName.Length == 0)
            {
                return null;
            }
             DataContext db = new DataContext(PathBD);
             var worker = from row in db.GetTable<Worker>()
                          where row.SurName == surName
                          select row;
             if (worker.Count() == 0)
             {
                 return null;
             }
             ushort idSearchWorker = (ushort)worker.First().Id;
             var dayWork = from row in db.GetTable<DaysWork>()
                           where row.Id_Worker == idSearchWorker
                           select row;
            if(dayWork.Count() == 0)
            {
                return null;
            }
            DateTime[] result = new DateTime[dayWork.Count()];
            ushort i = 0;
            foreach(var item in dayWork)
            {
                result[i] = item.Day;
                i++;
            }
            return result;
        }
        public event PropertyChangedEventHandler PropertyChanged;
        public void OnPropertyChanged([CallerMemberName] string prop = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
        }
    } 
}
