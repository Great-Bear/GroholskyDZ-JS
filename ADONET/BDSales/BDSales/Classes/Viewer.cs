using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Data.Common;
using System.Data.SqlClient;
using System.Windows.Controls;
using System.Data;
using BDSales.Classes;
 
namespace BDSales.Classes
{
    class Viewer
    {
        public String ConectString { get; set; }
        public Viewer(string conectString)
        {
            ConectString = conectString;
        }
        public void SetNameTables(ComboBox list,Label nameBD)
        {
            try
            {
                using (var connection = new SqlConnection(ConectString))
                {
                    connection.Open();
                    nameBD.Content = $"Data base:{connection.Database}";
                    DataTable schema = connection.GetSchema("Tables");
                    for (int i = 0; i < schema.Rows.Count; i++)
                    {
                        ComboBoxItem newConmboElem = new ComboBoxItem();
                        newConmboElem.Content = schema.Rows[i][2].ToString();
                        list.Items.Add(newConmboElem);
                    }
                }
            }
            catch (DbException ex)
            {
                Console.WriteLine($"Error with work BD: {ex.Message}");
            }
        }
        public void LoadNewDataTable(string Question,ListBox listData)
        {
            SendQuest(Question,listData);
        }
        private void SendQuest(string Question,ListBox listData)
        {
            try
            {
                using (var connection = new SqlConnection(ConectString))
                {
                    connection.Open();
                    using (var command = new SqlCommand(Question, connection))
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        int countCol = reader.FieldCount;
                        String title = "";
                        for (int i = 1; i < countCol; i++)
                        {
                            title += $"{reader.GetName(i)}\t";
                            if (i == countCol - 2 && countCol != 3)
                            {
                                 title += '\t';
                            }
                        }
                       // title += '\t';
                        ListBoxItem newListBoxItem = new ListBoxItem();
                        newListBoxItem.Content = title;
                        listData.Items.Add(newListBoxItem);
                        while (reader.Read())
                        {
                            ListBoxItem newElemBoxItem = new ListBoxItem(); ;
                            for (int i = 1; i < countCol; i++)
                            {
                                newElemBoxItem.Content += ($"{reader.GetValue(i)}\t\t");
                            }
                            listData.Items.Add(newElemBoxItem);
                        }
                    }
                }
            }
            catch (DbException ex)
            {
                Console.WriteLine($"Error with work BD: {ex.Message}");
            }
        }
        public void ClearListNameTable(ListBox list) 
        {
            list.Items.Clear();
        }

    }
}
