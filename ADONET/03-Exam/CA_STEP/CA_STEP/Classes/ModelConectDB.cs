﻿using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
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
        Courses,
        Clients,
        NameGroups,
        Groups,
        ProgressStudy,
    }

    class ModelConectDB : DbContext
    {
        public DbSet<Branche> Branches { get; set; }
        public DbSet<ContactsBranche> ContactsBranches { set; get; }
        public DbSet<Position> Positions { set; get; }
        public DbSet<Worker> Workers { set; get; }
        public DbSet<Specialist> Specialists { set; get; }
        public DbSet<Subject> Subjects { set; get; }
        public DbSet<NameCourse> NameCourses { set; get; }
        public DbSet<Course> Courses { set; get; }
        public DbSet<Client> Clients { set; get; }
        public DbSet<NameGroup> NameGroups { set; get; }
        public DbSet<Group> Groups { set; get; }
        public DbSet<ProgressStudy> ProgressStudys { set; get; }
        public List<DbSet> Tables { set; get; } = new List<DbSet>();
        public List<string> NameTables { set; get; } = new List<string>();
        public List<List<string>> NameColums { set; get; } = new List<List<string>>();
      
        public ModelConectDB() : base("Server=(local);Database=CA_STEP;Trusted_Connection=True;")
        {         
            NameTables.Add("Branches");
            NameTables.Add("ContactsBranches");
            NameTables.Add("Positions");
            NameTables.Add("Workers");
            NameTables.Add("Specialists");
            NameTables.Add("Subjects");
            NameTables.Add("NameCourses");
            NameTables.Add("Courses");
            NameTables.Add("Clients");
            NameTables.Add("NameGroups");
            NameTables.Add("Groups");
            NameTables.Add("ProgressStudy");

            NameColums.Add(Branche.NameColums);
            NameColums.Add(ContactsBranche.NameColums);
            NameColums.Add(Position.NameColums);
            NameColums.Add(Worker.NameColums);
            NameColums.Add(Specialist.NameColums);
            NameColums.Add(Subject.NameColums);
            NameColums.Add(NameCourse.NameColums);
            NameColums.Add(Course.NameColums);
            NameColums.Add(Client.NameColums);
            NameColums.Add(NameGroup.NameColums);
            NameColums.Add(Group.NameColums);
            NameColums.Add(ProgressStudy.NameColums);

            Tables.Add(Branches);
            Tables.Add(ContactsBranches);
            Tables.Add(Positions);
            Tables.Add(Workers);
            Tables.Add(Specialists);
            Tables.Add(Subjects);
            Tables.Add(NameCourses);
            Tables.Add(Courses);
            Tables.Add(Clients);
            Tables.Add(NameGroups);
            Tables.Add(Groups);
            Tables.Add(ProgressStudys);

            foreach (var item in Tables)
            {
                item.Load();
            }

            /* var tasks = new List<Task>();
           foreach (var item in Tables)
           {               
              tasks.Add(item.LoadAsync());
           }
           tasks.ElementAt(Tables.Count - 1).Wait();*/
        }
        public void Remove(int idTable, int idElem)
        {                   
            try
            {
                Tables[idTable].Remove(Tables[idTable].Find(idElem));
                SaveChanges();
            }
            catch (DbUpdateException)
            {
                CancelChanging();
                MessageBox.Show("You cannot delete the entry because there is a link to it");
            }
            catch (Exception)
            {
                MessageBox.Show("Incorrect action call system admin");
            }
        }
        public void AddNewItem(int idTable, List<string> values)
        {
            try
            {
                Tables[idTable].Add(((ITable)Tables[idTable].Create()).CreateNewElem(values));              
                SaveChanges();
            }
            catch(DbUpdateException ex)
            {             
                MessageBox.Show("non-existent index or input value must be unique");
                CancelChanging();
            }
            catch (FormatException)
            {
                MessageBox.Show("Incorrect format data");
                CancelChanging();
            }
            catch (DbEntityValidationException)
            {
                MessageBox.Show("Incorrect format data");
                CancelChanging();
            }
            catch (Exception)
            {
                MessageBox.Show("Incorrect action call system admin");
                CancelChanging();
            }
        }
        public void EditNewItem(int idTable,int idElem, List<string> values)
        {          
            try
            {
                ((ITable)Tables[idTable].Find(idElem)).EditItem(values);
                SaveChanges();
            }
            catch (DbUpdateException)
            {
                MessageBox.Show("non-existent index or input value must be unique");
                CancelChanging();
            }
            catch (FormatException)
            {
                MessageBox.Show("Incorrect format data");
                CancelChanging();
            }
            catch (DbEntityValidationException)
            {
                MessageBox.Show("Incorrect format data");
                CancelChanging();
            }
            catch (Exception)
            {
                MessageBox.Show("Incorrect action call system admin");
                CancelChanging();
            }
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
