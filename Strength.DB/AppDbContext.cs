using Microsoft.EntityFrameworkCore;
using Strength.DB.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Strength.DB
{
    public class AppDbContext : DbContext
    {
 
        public DbSet<User> Users { get; set; }
        public DbSet<ExProgram> Programs { get; set; }
        public DbSet<Day> Days { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<ExCompletion> Completions { get; set; }
        public DbSet<Set> Sets { get; set; }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(
                    @"Server=(localdb)\mssqllocaldb;Database=Strength;Integrated Security=True");
            }
       
    }
}
