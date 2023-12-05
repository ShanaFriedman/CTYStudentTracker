using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentTrackerCTY.Data
{
    public class StudentDbContext : DbContext
    {
        private string _connectionString;

        public StudentDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<AddressDetails> Addresses { get; set; }
        public DbSet<Note> Notes { get; set; }
        //public DbSet<SupportStaff> SupportStaff { get; set; }
        //public DbSet<StudentSupportStaff> StudentSupportStaff { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //by default Entity Framework sets all foreign key relationship delete rules
            //to be Cascade delete. This code changes it to be Restrict which is more in line
            //of what we're used to in that it will fail deleting a parent, if there are still
            //any children
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            //////set up composite primary key
            //modelBuilder.Entity<StudentSupportStaff>()
            //    .HasKey(sss => new { sss.StudentId, sss.SupportStaffId });

            //modelBuilder.Entity<Student>()
            //    .HasMany(s => s.Notes);

            //modelBuilder.Entity<Note>()
            //    .HasOne(n => n.Student)
            //    .WithMany()
            //    .OnDelete(DeleteBehavior.Cascade);
               

        }

    }
}
