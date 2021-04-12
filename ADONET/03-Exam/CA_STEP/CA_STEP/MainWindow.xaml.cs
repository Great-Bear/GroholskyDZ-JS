using CA_STEP.Classes;
using CA_STEP.Classes.Tables;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
namespace CA_STEP
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class  MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = new ViewModels();
            NameTablesCombo.SelectedIndex = 0;
            CreateNewListView(Branche.NameColums);
        }
        public void CreateNewListView(List<string> nameColums) 
        {
            GridView grdView = new GridView();
            foreach (var item in nameColums)
            {
                GridViewColumn nameColumn = new GridViewColumn();
                nameColumn.Header = item;
                nameColumn.Width = 120;
                nameColumn.DisplayMemberBinding = new Binding(item);
                grdView.Columns.Add(nameColumn);

            }
            dataTable.View = grdView;

            int indexTable = 0;
            if (NameTablesCombo.SelectedIndex != -1){
                indexTable = NameTablesCombo.SelectedIndex;
            }
           
            dataTable.SetBinding(ListView.ItemsSourceProperty,new Binding(((ViewModels)DataContext).NamesTables[indexTable]));

        }    
        private void NameTablesCombo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            AddForm.Children.Clear();
            AddButton.Visibility = Visibility.Visible;
            AddNewLine.Visibility = Visibility.Hidden;

            Edit.Visibility = Visibility.Visible;
            EditLine.Visibility = Visibility.Hidden;

            CreateNewListView(((ViewModels)DataContext).TakeCurrectNameColums(NameTablesCombo.SelectedIndex));
        }       
        private void Del_Click(object sender, RoutedEventArgs e)
        {
            AddForm.Children.Clear();
            AddButton.Visibility = Visibility.Visible;
            AddNewLine.Visibility = Visibility.Hidden;

            Edit.Visibility = Visibility.Visible;
            EditLine.Visibility = Visibility.Hidden;

            if (dataTable.SelectedIndex < 0)
            {
                MessageBox.Show("Please choice elemen for delete","Delete Element",
                                MessageBoxButton.OK,MessageBoxImage.Information);
                return;
            }
            MessageBoxResult action;
            action = MessageBox.Show("Are you real want delete selected item?\n" +
                            "This action you cannot undo action","Delete item",
                            MessageBoxButton.YesNoCancel,MessageBoxImage.Warning);
            if(action == MessageBoxResult.Yes) 
            {
                ((ViewModels)DataContext).Remove(NameTablesCombo.SelectedIndex,
                                           ((Classes.Tables.ITable)dataTable.SelectedValue).ID);
            }   
            
        }
        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            foreach (var item in AddForm.Children)
            {
                if(item is TextBox)
                {
                    ((TextBox)item).Text = string.Empty;
                }
            }  
        }
        public void CreateForm()
        {
            var currNameColums = ((ViewModels)DataContext).TakeCurrectNameColums(NameTablesCombo.SelectedIndex);
            int PosX = -700;
            int PosXLabel = -70;
            AddForm.Children.Clear();
            for (int i = 0; i < currNameColums.Count; i++)
            {
                PosX += 210;
                PosXLabel += 100;

                var textBox = new TextBox();
                textBox.Width = 100;
                textBox.Height = 20;
                textBox.TextWrapping = TextWrapping.Wrap;
                var margin = new Thickness();
                margin.Left = PosX;
                margin.Top = 70;
                textBox.Margin = margin;

                var nameCol = new Label();
                nameCol.Content = currNameColums.ElementAt(i);
                var marginlab = new Thickness();
                marginlab.Left = PosXLabel;
                marginlab.Top = 60;
                nameCol.Margin = marginlab;

                AddForm.Children.Add(nameCol);
                AddForm.Children.Add(textBox);
            }
            var clearBut = new Button();
            clearBut.Content = "ClearField";
            clearBut.Click += ClearButton_Click;
            clearBut.Width = 68;
            clearBut.Height = 25;
            var marginBut = new Thickness();
            marginBut.Left = -215;
            marginBut.Top = -75;
            clearBut.Margin = marginBut;
            AddForm.Children.Add(clearBut);
        }
        public void FillForm()
        {
            if (AddForm.Children.Count != 0 && 
                dataTable.SelectedIndex >= 0)
            {
                int indexPropCurrTable = 0;
                foreach (var item in AddForm.Children)
                {
                    if (item is TextBox == true)
                    {
                        ((TextBox)item).Text = ((ITable)dataTable.SelectedValue).TakeProperty(indexPropCurrTable);
                        indexPropCurrTable++;
                    }
                }
            }
        }
        private void Add_Click(object sender, RoutedEventArgs e)
        {
            AddButton.Visibility = Visibility.Hidden;
            AddNewLine.Visibility = Visibility.Visible;

            Edit.Visibility = Visibility.Visible;
            EditLine.Visibility = Visibility.Hidden;

            CreateForm();
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            List<string> values = new List<string>();
            foreach (var item in AddForm.Children)
            {
                if(item is TextBox == true)
                {            
                    if (((TextBox)item).Text.Length == 0)
                    {
                        MessageBox.Show("Don`t all field is full");
                        return;
                    }
                    if (string.Compare(((TextBox)item).Text, "null", StringComparison.InvariantCultureIgnoreCase) == 0)
                    {                       
                        values.Add(null);
                    }
                    else
                    {
                        values.Add(((TextBox)item).Text);
                    }
                        ((TextBox)item).Text = string.Empty;
                }
            }
            ((ViewModels)DataContext).AddNewItem(NameTablesCombo.SelectedIndex,values);
            dataTable.SelectedIndex = -1;
        }
        private void Edit_Click(object sender, RoutedEventArgs e)
        {
            AddButton.Visibility = Visibility.Visible;
            AddNewLine.Visibility = Visibility.Hidden;

            Edit.Visibility = Visibility.Hidden;
            EditLine.Visibility = Visibility.Visible;

            CreateForm();
        }
        private void Edit_Line_Click(object sender, RoutedEventArgs e)
        {
            List<string> values = new List<string>();
            foreach (var item in AddForm.Children)
            {
                if (item is TextBox == true)
                {
                    if (((TextBox)item).Text.Length == 0)
                    {
                        return;
                    }
                    values.Add(((TextBox)item).Text);
                    ((TextBox)item).Text = string.Empty;
                }
            }
            ((ViewModels)DataContext).EditItem(NameTablesCombo.SelectedIndex,
                                              ((Classes.Tables.ITable)dataTable.SelectedValue).ID, values);
        }
        private void dataTable_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            FillForm();
        }
    }
}
