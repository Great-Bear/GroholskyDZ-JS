using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Windows;

namespace CA_STEP.Classes
{
    enum IndexTable : int
    {
        Branches = 0,
        ContactsBranches,
        Positions,
        Workers,
        Specialists,
        Subjects,
        NameCourses,
    }

    class ModelConectDB : DbContext
    {
        public DbSet<Branche> Branches { get; set; }
        public DbSet<ContactsBranches> ContactsBranches { set; get; }
        public DbSet<Position> Positions { set; get; }
        public DbSet<Workers> Workers { set; get; }
        public DbSet<Specialists> Specialists { set; get; }
        public DbSet<Subjects> Subjects { set; get; }
        public DbSet<NameCourses> NameCourses { set; get; }
        public List<string> NameTables { set; get; } = new List<string>();

        public ModelConectDB() : base("Server=(local);Database=CA_STEP2;Trusted_Connection=True;")
        {         
            NameTables.Add("Branches");
            NameTables.Add("ContactsBranches");
            NameTables.Add("Positions");
            NameTables.Add("Workers");
            NameTables.Add("Specialists");
            NameTables.Add("Subjects");
            NameTables.Add("NameCourses");
        }
        public void Remove(int indexTable, int indexRow)
        {
            switch (indexTable)
            {
                case (int)IndexTable.Branches:
                    Branches.Remove(Branches.Find(indexRow));
                    break;

                case (int)IndexTable.ContactsBranches:
                    ContactsBranches.Remove(ContactsBranches.Find(indexRow));
                    break;

                case (int)IndexTable.Positions:
                    Positions.Remove(Positions.Find(indexRow));
                    break;

                case (int)IndexTable.Workers:
                    Workers.Remove(Workers.Find(indexRow));
                    break;

                case (int)IndexTable.Specialists:
                    Specialists.Remove(Specialists.Find(indexRow));
                    break;

                case (int)IndexTable.Subjects:
                    Subjects.Remove(Subjects.Find(indexRow));
                    break;

                case (int)IndexTable.NameCourses:
                    NameCourses.Remove(NameCourses.Find(indexRow));
                    break;
            }
            try
            {
               SaveChanges();
            }
            catch (DbUpdateException)
            {
                CancelChanging();
                MessageBox.Show("You cannot delete the entry because there is a link to it");
                return;
            }         
        }
        public void AddNewItem(int idTable, List<string> values)
        {            
            switch (idTable)
            {
                case (int)IndexTable.Branches:
                    Branches.Add(new Branche(values[0],values[1],values[2]));
                    break;

                case (int)IndexTable.ContactsBranches:
                     int idBranch;
                     if(Int32.TryParse(values[0],out idBranch) == true)
                     {
                        ContactsBranches.Add(new ContactsBranches(idBranch, values[1], values[2]));                    
                     }
                     else
                     {
                        MessageBox.Show("Id_Branch value is not number");
                     }              
                    break;

                case (int)IndexTable.Positions:
                    decimal rate;
                    if(Decimal.TryParse(values[1], NumberStyles.AllowDecimalPoint, CultureInfo.CreateSpecificCulture("en-GB"), out rate) == true)
                    {
                        Positions.Add(new Position(values[0], rate));
                    }
                    else
                    {
                        MessageBox.Show("RateHouer value is not number");
                    }
                    break;

                case (int)IndexTable.Subjects:
                    Subjects.Add(new Subjects(values[0]));
                    break;

                case (int)IndexTable.NameCourses:
                    NameCourses.Add(new NameCourses(values[0]));
                    break;
            }
            try
            {
                    SaveChanges();
            }
            catch(DbUpdateException ex)
            {
                CancelChanging(); 
                MessageBox.Show("non-existent index or input value must be unique");
                return;
            }          
        }
        public void EditNewItem(int idTable, List<string> values)
        { 

        }
        private void CancelChanging()
        {        
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Deleted:
                        entry.Reload();
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            }           
        }
    }
}
