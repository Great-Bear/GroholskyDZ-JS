using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using _06_Orders.Models;

namespace _06_Orders.Data
{
    public class _06_OrdersContext : DbContext
    {
        public _06_OrdersContext (DbContextOptions<_06_OrdersContext> options)
            : base(options)
        {
        }

        public DbSet<_06_Orders.Models.Order> Order { get; set; }
    }
}
