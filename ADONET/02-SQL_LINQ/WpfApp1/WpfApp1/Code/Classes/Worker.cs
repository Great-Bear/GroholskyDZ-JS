using System;
using System.Data.Linq.Mapping;

namespace WpfApp1.Code.Classes
{
    [Table(Name = "Workers")]
    public class Worker
    {
        [Column(IsPrimaryKey = true, IsDbGenerated = true)]
        public int Id { get; set; }
        [Column(Name = "Name")]
        public string Name { get; set; }
        [Column(Name = "SurName")]
        public string SurName { get; set; }
        [Column(Name = "Patronymic")]
        public string Patronymic { get; set; }
        [Column(Name = "GotJob")]
        public DateTime GotJob { get; set; }
        [Column(Name = "QuitJob")]
        public DateTime QuitJob { get; set; }
    }
}
