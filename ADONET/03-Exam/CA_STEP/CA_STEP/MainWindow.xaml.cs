using CA_STEP.Classes;
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
               var IDdeleteItems = new List<int>();
               foreach (var item in dataTable.SelectedItems)
               {
                   IDdeleteItems.Add(((IElementDB)item).ID);
               }
               ((ViewModels)DataContext).Remove(NameTablesCombo.SelectedIndex,IDdeleteItems);
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
                if (item is ComboBox)
                {
                    ((ComboBox)item).SelectedIndex = -1;
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

             for (int nameColunIndex = 1; nameColunIndex < currNameColums.Count; nameColunIndex++)
             {
                var nameCol = new Label();
                nameCol.Content = currNameColums.ElementAt(nameColunIndex).Replace("ID__", "");
                var marginlab = new Thickness();
                marginlab.Left = PosXLabel;
                marginlab.Top = 60;
                nameCol.Margin = marginlab;

                UIElement containerSelectedDataColum;

                if (currNameColums.ElementAt(nameColunIndex).Contains("ID__"))
                {
                    var comboBox = new ComboBox();
                    comboBox.Width = 100;
                    comboBox.Height = 22;
                    comboBox.HorizontalAlignment = HorizontalAlignment.Left;
                    comboBox.VerticalAlignment = VerticalAlignment.Top;
                    var margin = new Thickness();
                    margin.Left = PosX;
                    margin.Top = 85;
                    comboBox.Margin = margin;
                    
                    int indexRefTable = TakeIndexRefTable(currNameColums.ElementAt(nameColunIndex).Substring(4, currNameColums.ElementAt(nameColunIndex).Length - 4));
                    var table = ((ViewModels)DataContext).TakeTable(indexRefTable);

                    for (int lineTableIndex = 0; lineTableIndex < table.Count; lineTableIndex++)
                    {
                        string value = TakeValueTable(indexRefTable, lineTableIndex);
                        
                        if(HasComboValue(comboBox,value) == false)
                            comboBox.Items.Add(value);

                        if (comboBox.Width <= value.Length * 7)
                        {
                            int diff = value.Length * 7 - (int)comboBox.Width;
                            PosX += diff;
                            PosXLabel += diff;
                            comboBox.Width = value.Length * 7;
                        }
                    }
                    containerSelectedDataColum = comboBox;
                }
                else
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

                    containerSelectedDataColum = textBox;
                }
                PosX += 110;
                PosXLabel += 110;

                AddForm.Children.Add(nameCol);
                AddForm.Children.Add(containerSelectedDataColum);
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
        private string TakeValueTable(int tableIndex, int lineTableIndex)
        {
            var table = ((ViewModels)DataContext).TakeTable(tableIndex);
            int countPropTable = ((ViewModels)DataContext).CountPropTables[tableIndex];
            string value = string.Empty;
            for (int columIndex = 1; columIndex < countPropTable; columIndex++)
            {
                if (((IElementDB)table[lineTableIndex]).TakeProperty(columIndex) != string.Empty)
                {
                    value += ((IElementDB)table[lineTableIndex]).TakeProperty(columIndex) + " ";
                }
            }
            return value;
        }
        private bool HasComboValue(ComboBox comboBox, string value)
        {
            foreach (var valueCombo in comboBox.Items)
            {
                if ((string)valueCombo == (string)value)
                {
                    return true;
                }
            }
            return false;
        }
        public void FillForm()
        {
            if (AddForm.Children.Count != 0 && 
                dataTable.SelectedIndex >= 0)
            {
                int countIDColums = 0;
                foreach (var item in ((ViewModels)DataContext).TakeCurrectNameColums(NameTablesCombo.SelectedIndex))
                {
                    if(item.Contains("ID_") == true)
                    {
                        countIDColums++;
                    }
                } 

                int indexPropCurrTable = 1 + countIDColums;
                int indexNavigationProp = 1;
                foreach (var item in AddForm.Children)
                {
                    if (item is TextBox == true)
                    {
                        ((TextBox)item).Text = ((IElementDB)dataTable.SelectedValue).TakeProperty(indexPropCurrTable);
                        indexPropCurrTable++;                   
                    }
                    if (item is ComboBox == true)
                    {
                        var valueProp = ((IElementDB)dataTable.SelectedItem).TakeNavigationProperty(indexNavigationProp) + " ";
                            ((ComboBox)item).SelectedItem = valueProp;
                        indexNavigationProp++;
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

            CreateForm();
        }
        private void Add_Line_Click(object sender, RoutedEventArgs e)
        {
            List<string> values = TakeInputValues();
            if(values == null)
            {
                if (dataTable.SelectedIndex < 0)
                {
                    MessageBox.Show("Please choice value comboBox", "Delete Element",
                                    MessageBoxButton.OK, MessageBoxImage.Information);
                    return;
                }
            }
            ((ViewModels)DataContext).AddNewItem(NameTablesCombo.SelectedIndex,values);
            dataTable.SelectedIndex = -1;
        }

        private int TakeIndexRefTable(string nameColum)
        {
            int indexRefTable = 0;
            foreach (var nameTable in ((ViewModels)DataContext).NamesTables)
            {
                if (nameTable == nameColum)
                {
                    break;
                }
                indexRefTable++;
            }
            return indexRefTable;
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
            if (dataTable.SelectedIndex < 0)
            {
                MessageBox.Show("Please choice elemen for edit", "Delete Element",
                                MessageBoxButton.OK, MessageBoxImage.Information);
                return;
            }
            List<string> values = TakeInputValues();
            values.Insert(0, string.Empty);
            ((ViewModels)DataContext).EditItem(NameTablesCombo.SelectedIndex,
                                              ((Classes.Tables.IElementDB)dataTable.SelectedValue).ID, values);
        }
        private List<string> TakeInputValues()
        {
            List<string> values = new List<string>();
            int indexColum = 1;
            foreach (var item in AddForm.Children)
            {
                if (item is TextBox == true)
                {
                    if (((TextBox)item).Text.Length != 0)
                    {
                        values.Add(((TextBox)item).Text);
                        ((TextBox)item).Text = string.Empty;
                    }
                    else
                    {
                        values.Add(null);
                    }

                }
                if (item is ComboBox)
                {
                    if(((ComboBox)item).SelectedIndex < 0)
                    {
                        return null;
                    }
                    var currNameColums = ((ViewModels)DataContext).CurrectNameColums;
                    int indexRefTable = TakeIndexRefTable(currNameColums.ElementAt(indexColum).Substring(4, currNameColums.ElementAt(indexColum).Length - 4));

                    var table = ((ViewModels)DataContext).TakeTable(indexRefTable);

                    for (int lineTableIndex = 0; lineTableIndex < table.Count; lineTableIndex++)
                    {
                        string value = TakeValueTable(indexRefTable, lineTableIndex);

                        if (value == (string)((ComboBox)item).SelectedValue)
                        {
                            values.Add(((IElementDB)table[lineTableIndex]).ID.ToString());
                            ((ComboBox)item).SelectedIndex = -1;
                            break;
                        }
                    }
                    indexColum++;
                }
            }
            return values;
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
