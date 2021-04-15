﻿using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;

namespace CA_STEP.Classes
{
    partial class ViewModels : INotifyPropertyChanged
    {         
        public ViewModels()
        {
            ConectDB = new ModelConectDB();
            NamesTables = ConectDB.NameTables;           
        }   
        public void Remove(int indexTable,int indexRow)
        {
             ConectDB.Remove(indexTable,indexRow);
             UpdateCurrentTable();
        }

        public void UpdateCurrentTable()
        {
            CurrentList.Clear();
            foreach (var item in ConectDB.CurrentList)
            {
                CurrentList.Add(item);
            }
        }           
        public List<string> TakeCurrectNameColums(int indexTable)
        {
            CurrectNameColums = new List<string>(ConectDB.NameColums[indexTable]);
            return ConectDB.NameColums[indexTable];         
        }
        public void AddNewItem(int idTable, List<string> values)
        {
            ConectDB.AddNewItem(idTable, values);
            UpdateCurrentTable();
        }
        public void EditItem(int idTable,int idElem, List<string> values)
        {
            ConectDB.EditNewItem(idTable, idElem, values);
            UpdateCurrentTable();
        }      
        public void Where(int idTable,int idColumb,string value)
        {
            ConectDB.Where(idTable,idColumb,value);
            UpdateCurrentTable();
        }
        public void AllSelect(int idTable)
        {
            ConectDB.AllSelect(idTable);
            UpdateCurrentTable();
        }
        public void Sort(int typeSort,int idProp)
        {
            ConectDB.Sort(typeSort,idProp);
            UpdateCurrentTable();
        }
        public bool ExistsValue(int indexColum,string value)
        {
            return ConectDB.ExistsValue(indexColum, value);
        }
    }
}
