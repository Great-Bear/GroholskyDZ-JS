using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Data.Common;
using System.Data.SqlClient;
using WpfApp1.Code;

namespace WpfApp1
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = new ViewModel();
        }
        private void Button_Click(object sender, RoutedEventArgs e)
        {      
            ((ViewModel)DataContext).ShowActivityWorkers(searchWorker.Text);
        }
    }
}
