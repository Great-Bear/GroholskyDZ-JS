﻿using CA_STEP.Classes;
using CA_STEP.Classes.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Media;
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
            int widthColum = 30;
            foreach (var item in nameColums)
            {
                GridViewColumn nameColumn = new GridViewColumn();
                nameColumn.Header = (string)item.Replace("ID__", "");
                nameColumn.Width = widthColum;
                nameColumn.DisplayMemberBinding = new Binding(item);   
                grdView.Columns.Add(nameColumn);
                if(item == nameColums.ElementAt(0))
                {
                    widthColum = 120;
                }
            }
            dataTable.View = grdView;

            int indexTable = 0;
            if (NameTablesCombo.SelectedIndex != -1){
                indexTable = NameTablesCombo.SelectedIndex;
            }        
            ((ViewModels)DataContext).AllSelect(indexTable);
            NameTableColumn.SelectedIndex = 0;
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

            SelectOptionsGrid.Visibility = Visibility.Hidden;

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
                                           ((Classes.Tables.IElementDB)dataTable.SelectedValue).ID);
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
        public void CreateForm(int action = 0)
        {
            if (DataContext == null)
            {
                return;
            }

            var currNameColums = ((ViewModels)DataContext).TakeCurrectNameColums(NameTablesCombo.SelectedIndex);
            int PosX = 30;
            int PosXLabel = 30;
            AddForm.Children.Clear();

             for (int i = 1; i < currNameColums.Count; i++)
             {
                 var textBox = new TextBox();
                 textBox.Width = 100;
                 textBox.Height = 22;
                 textBox.HorizontalAlignment = HorizontalAlignment.Left;
                 textBox.VerticalAlignment = VerticalAlignment.Top;
                 textBox.TextWrapping = TextWrapping.Wrap;
                 var margin = new Thickness();
                 margin.Left = PosX;
                 margin.Top = 85;
                 textBox.Margin = margin;

                 var nameCol = new Label();
                 nameCol.Content = currNameColums.ElementAt(i);
                 var marginlab = new Thickness();
                 marginlab.Left = PosXLabel;
                 marginlab.Top = 60;
                 nameCol.Margin = marginlab;

                PosX += 110;
                PosXLabel += 110;

                AddForm.Children.Add(nameCol);
                AddForm.Children.Add(textBox);
             }
             var clearBut = new Button();
             clearBut.Content = "ClearField";
             clearBut.Click += ClearButton_Click;
             clearBut.Width = 68;
             clearBut.Height = 22;
             clearBut.HorizontalAlignment = HorizontalAlignment.Left;
             clearBut.VerticalAlignment = VerticalAlignment.Top;

             var marginBut = new Thickness();
             marginBut.Left = 170;
             marginBut.Top = 10;
             clearBut.Margin = marginBut;
             AddForm.Children.Add(clearBut);
        }
        public void FillForm()
        {
            if (AddForm.Children.Count != 0 && 
                dataTable.SelectedIndex >= 0)
            {
                int indexPropCurrTable = 1;
                foreach (var item in AddForm.Children)
                {
                    if (item is TextBox == true)
                    {
                        ((TextBox)item).Text = ((IElementDB)dataTable.SelectedValue).TakeProperty(indexPropCurrTable);
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

            SelectOptionsGrid.Visibility = Visibility.Hidden;

            ((ViewModels)DataContext).AllSelect(NameTablesCombo.SelectedIndex);

            CreateForm(1);
        }
        private void Add_Line_Click(object sender, RoutedEventArgs e)
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

            SelectOptionsGrid.Visibility = Visibility.Hidden;

            ((ViewModels)DataContext).AllSelect(NameTablesCombo.SelectedIndex);

            CreateForm();
        }
        private void Edit_Line_Click(object sender, RoutedEventArgs e)
        {
            List<string> values = new List<string>();
            values.Add(" ");
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
                                              ((Classes.Tables.IElementDB)dataTable.SelectedValue).ID, values);
        }
        private void dataTable_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            FillForm();
        }

        private void Button_Where_Click(object sender, RoutedEventArgs e)
        {          
            ((ViewModels)DataContext).Where(NameTablesCombo.SelectedIndex, NameTableColumn.SelectedIndex, ValueWhere.Text);
            ValueWhere.Text = string.Empty;
        }

        private void All_Button_Click(object sender, RoutedEventArgs e)
        {
            ((ViewModels)DataContext).AllSelect(NameTablesCombo.SelectedIndex);
        }

        private void SelectOption_Click(object sender, RoutedEventArgs e)
        {
            AddForm.Children.Clear();

            AddButton.Visibility = Visibility.Visible;
            AddNewLine.Visibility = Visibility.Hidden;

            Edit.Visibility = Visibility.Visible;
            EditLine.Visibility = Visibility.Hidden;

            SelectOptionsGrid.Visibility = Visibility.Visible;
        }

        private void Sort_Click(object sender, RoutedEventArgs e)
        {
            ((ViewModels)DataContext).Sort(SortCombo.SelectedIndex, NameTableColumn.SelectedIndex);
        }

        private void ValueWhere_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (DataContext != null)
            {
                if(ValueWhere.Text.Length == 0 || ValueWhere.Text.StartsWith(" ")) 
                {
                    ValueWhere.Background = Brushes.White;
                }
                else if (((ViewModels)DataContext).ExistsValue(NameTableColumn.SelectedIndex, ValueWhere.Text) == true)
                {
                    var bc = new BrushConverter();
                    ValueWhere.Background = (Brush)bc.ConvertFrom("#FF53D653");
                }
                else
                {
                    var bc = new BrushConverter();
                    ValueWhere.Background = (Brush)bc.ConvertFrom("#FFE0927B");
                }
            }
        }
    }
}
