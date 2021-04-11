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
            CreateNewListView(Branche.NameColums);
            UpdateDataTable();
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
        }
       
        private void NameTablesCombo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            AddForm.Children.Clear();
            AddButton.Visibility = Visibility.Visible;
            AddNewLine.Visibility = Visibility.Hidden;

            CreateNewListView(((ViewModels)DataContext).TakeCurrectNameColums(NameTablesCombo.SelectedIndex));
            UpdateDataTable();
        }
        private void UpdateDataTable()
        {

            switch (NameTablesCombo.SelectedIndex)
            {
                case (int)IndexTable.Branches:
                    dataTable.ItemsSource = ((ViewModels)DataContext).Branches;
                    break;

                case (int)IndexTable.ContactsBranches:
                    dataTable.ItemsSource = ((ViewModels)DataContext).ContactsBranches;
                    break;

                case (int)IndexTable.Positions:
                    dataTable.ItemsSource = ((ViewModels)DataContext).Position;
                    break;

                case (int)IndexTable.Workers:
                    dataTable.ItemsSource = ((ViewModels)DataContext).Workers;
                    break;

                case (int)IndexTable.Specialists:
                    dataTable.ItemsSource = ((ViewModels)DataContext).Specialists;
                    break;

                case (int)IndexTable.Subjects:
                    dataTable.ItemsSource = ((ViewModels)DataContext).Subjects;
                    break;

                case (int)IndexTable.NameCourses:
                    dataTable.ItemsSource = ((ViewModels)DataContext).NameCourses;
                    break;
            }
        }

        private void Del_Click(object sender, RoutedEventArgs e)
        {
            AddForm.Children.Clear();
            AddButton.Visibility = Visibility.Visible;
            AddNewLine.Visibility = Visibility.Hidden;
            if (dataTable.SelectedIndex < 0)
            {
                return;
            }

            ((ViewModels)DataContext).Remove(NameTablesCombo.SelectedIndex,
                                            ((Classes.Tables.ITable)dataTable.SelectedValue).ID);
            UpdateDataTable();     
        }

        private void SelectButton_Click(object sender, RoutedEventArgs e)
        {
            AddForm.Children.Clear();
            ((ViewModels)DataContext).UpdateCurrentTable(NameTablesCombo.SelectedIndex);
            UpdateDataTable();
        }

        private void Add_Click(object sender, RoutedEventArgs e)
        {
            AddButton.Visibility = Visibility.Hidden;
            AddNewLine.Visibility = Visibility.Visible;
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
                        return;
                    }
                    values.Add(((TextBox)item).Text);
                    ((TextBox)item).Text = string.Empty;
                }
            }
            ((ViewModels)DataContext).AddNewItem(NameTablesCombo.SelectedIndex,values);
            UpdateDataTable();
        }

        private void Edit_Click(object sender, RoutedEventArgs e)
        {
            Edit.Visibility = Visibility.Hidden;
            EditLine.Visibility = Visibility.Visible;

            if (dataTable.SelectedIndex < 0)
            {
                return;
            }
            
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
                textBox.Text = ((ITable)dataTable.SelectedValue).TakeProperty(i);
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
            ((ViewModels)DataContext).EditItem(NameTablesCombo.SelectedIndex, values);
            UpdateDataTable();
        }
    }
}
