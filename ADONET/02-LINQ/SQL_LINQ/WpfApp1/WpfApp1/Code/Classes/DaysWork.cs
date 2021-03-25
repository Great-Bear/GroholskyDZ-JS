using System;
using System.Data.Linq.Mapping;

namespace WpfApp1.Code.Classes
{
    [Table(Name = "DaysWork")]
    public class DaysWork
    {
        [Column(IsPrimaryKey = true, IsDbGenerated = true)]
        public int Id { get; set; }
        [Column(Name = "Id_Worker")]
        public int Id_Worker { get; set; }
        [Column(Name = "Day")]
        public DateTime Day { get; set; }
    }
}
