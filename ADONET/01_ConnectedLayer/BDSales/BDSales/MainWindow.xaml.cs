using System;
using System.Windows;
using System.Data.Common;
using System.Data.SqlClient;
using System.Windows.Controls;
using System.Data;
using BDSales.Classes;

namespace BDSales
{
    public partial class MainWindow : Window
    {
        private Viewer ViewerObj { get; set; }
        public MainWindow()
        {
            InitializeComponent();
            string connectionString =
            "Data Source=(local);Initial Catalog=Sales;" +
            "Integrated Security=SSPI;Pooling=False";
            ViewerObj = new Viewer(connectionString);
            ViewerObj.SetNameTables(listNameTable, NameDB);
        }
        private void ComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {         
            if(listNameTable.Items.Count == 0)
            {
                return;
            }
            String nameTable = "";
            ComboBoxItem selecItem = (ComboBoxItem)listNameTable.Items[listNameTable.SelectedIndex];
            nameTable = (string)selecItem.Content;
            ViewerObj.ClearListNameTable(ContentChoiceTable);
            ViewerObj.LoadNewDataTable("SELECT* FROM " + nameTable,ContentChoiceTable);
        }
    }
    
}
