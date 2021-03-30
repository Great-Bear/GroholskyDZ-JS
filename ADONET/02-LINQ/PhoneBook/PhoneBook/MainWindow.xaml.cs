using System;
using System.Collections.Generic;
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


namespace PhoneBook
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Closing += MainWindow_Closed;
            DataContext = new PhoneBookViewModel();
        }

        private void MainWindow_Closed(object sender, EventArgs e)
        {
            ((PhoneBookViewModel)DataContext).SaveContacts();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            ((PhoneBookViewModel)DataContext).Sort((uint)SortBy.SelectedIndex, (uint)OptionSort.SelectedIndex);
        }
        public Grid CurrectGrid { get; set; }
        private void Button_Click_1(object sender, RoutedEventArgs e)
        {

            HiddenGrid(CurrectGrid);
            ShowGrid(SortBlock);
        }

        void HiddenGrid(Grid grid)
        {
            if (grid != null)
            {
                grid.Visibility = Visibility.Hidden;
            }
        }
        void ShowGrid(Grid grid)
        {
            if (grid != null)
            {
                grid.Visibility = Visibility.Visible;
            }
            CurrectGrid = grid;
        }
        private void Button_Click_2(object sender, RoutedEventArgs e)
        {

            HiddenGrid(CurrectGrid);
            ShowGrid(EditBlock);
        }
        private void ListContacts_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ListContacts.SelectedIndex > -1)
            {
                var contact = (Contact)ListContacts.Items[ListContacts.SelectedIndex];
                SelectedName.Text = contact.Name;
                SelectedNumber.Text = contact.Number;
            }
        }
        private void ChangeContact(object sender, RoutedEventArgs e)
        {
            if (SelectedName.Text.Length == 0 || SelectedNumber.Text.Length == 0)
            {
                MessageBox.Show("Please full all fields for changing contact", "Change contact"
                                 , MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }
            if (ListContacts.SelectedIndex > -1)
            {
                ((PhoneBookViewModel)DataContext).ChangeContact((ushort)ListContacts.SelectedIndex,
                                                            SelectedName.Text,
                                                            SelectedNumber.Text);
            }
            else
            {
                MessageBox.Show("Please select contact which you want change", "Change contact"
                                , MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }

        private void Add_Click(object sender, RoutedEventArgs e)
        {
            HiddenGrid(CurrectGrid);
            ShowGrid(AddBlock);
        }

        private void AddNewContact(object sender, RoutedEventArgs e)
        {
            if (nameNewElem.Text.Length == 0 || numberNewElem.Text.Length == 0)
            {
                MessageBox.Show("Please full all fields that add new contact", "Add contact"
                                 , MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }
            ((PhoneBookViewModel)DataContext).AddNewContact(nameNewElem.Text, numberNewElem.Text);
            ResetFormAdd();
        }
        private void ResetAdd_Click(object sender, RoutedEventArgs e)
        {
            ResetFormAdd();
        }
        private void ResetFormAdd()
        {
            nameNewElem.Text = string.Empty;
            numberNewElem.Text = string.Empty;
        }

        private void Del_Click(object sender, RoutedEventArgs e)
        {
            MessageBoxResult result;

            if (ListContacts.SelectedIndex < 0)
            {
                MessageBox.Show("Please select contact which you want delete", "Delete contact"
                                , MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            result = MessageBox.Show($"Are you real want delete this contact?\nName: {SelectedName.Text}:\nNumber: {SelectedNumber.Text}", "Delete contact",
                               MessageBoxButton.OKCancel,
                               MessageBoxImage.Question);

            if (ListContacts.SelectedIndex > -1 && result == MessageBoxResult.OK)
            {
                ((PhoneBookViewModel)DataContext).DeleteContact((ushort)ListContacts.SelectedIndex);
            }                   
        }
    }
}
