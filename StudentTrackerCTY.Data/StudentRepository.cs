using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentTrackerCTY.Data
{
    public class StudentRepository
    {
        private string _connectionString;
        public StudentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddStudent(Student student)
        {
            var context = new StudentDbContext(_connectionString);
            
            var addressId = DoesAddressExist(student.Address);
            if (addressId != 0)
            {
                student.AddressId = addressId;
                student.Address = null;
            }
           
            context.Students.Add(student);
            context.SaveChanges();
        }
        public void EditStudent(Student s)
        {
            var context = new StudentDbContext(_connectionString);
            context.Students.Update(s);
            context.Addresses.Update(s.Address);
            context.SaveChanges();
        }
        public void DeleteStudent(int studentId)
        {
            var context = new StudentDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Notes WHERE StudentId = {studentId}");
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Students WHERE Id = {studentId}");
            //check if address is used for different student if not delete
            context.SaveChanges();
        }
        public List<Student> GetStudents()
        {
            var context = new StudentDbContext(_connectionString);
            return context.Students.ToList();
        }
        private int DoesAddressExist(AddressDetails a)
        {
            var context = new StudentDbContext(_connectionString);
            AddressDetails address = context.Addresses.FirstOrDefault(ad => ad.Address == a.Address && ad.ZipCode == a.ZipCode);
            if (address == null)
            {
                return 0;
            }
            return address.Id;
        }
        public Student GetStudentById(int id)
        {
            var context = new StudentDbContext(_connectionString);
            return context.Students.Include(s => s.Notes).Include(s => s.Address).FirstOrDefault(s => s.Id == id);
        }
        public void AddNote(Note note)
        {
            var context = new StudentDbContext(_connectionString);
            context.Notes.Add(note);
            context.SaveChanges();
        }
        public void DeleteNote(Note n)
        {
            var context = new StudentDbContext(_connectionString);
            //context.Database.ExecuteSqlInterpolated($"DELETE FROM Notes WHERE Id = {n.Id}");
            //var n = new Note
            //{
            //    Id = id
            //};
            context.Attach(n);
            context.Remove(n);
            context.SaveChanges();
        }
        public async Task<List<ClassName>> GetAllClassesAsync()
        {
            var context = new StudentDbContext(_connectionString);
            var classesb = context.Students;
            var classes = await context.Students.Select(_ => new { _.YearEnteredPrimary, _.ClassNumber }).Distinct()
                .OrderBy(c => c.YearEnteredPrimary).ThenBy(c => c.ClassNumber).ToListAsync();
            return classes.Select(c => new ClassName
            {
                Grade = DateTime.Now.Year - c.YearEnteredPrimary + (DateTime.Now.Month <= 8 ? 1 : 0),
                ClassNumber = c.ClassNumber
            }).ToList();
        
        }
        public List<Student> GetStudentsByClass(ClassName className)
        {
            var context = new StudentDbContext(_connectionString);
            int yearEnteredPrimary = DateTime.Now.Year - className.Grade - (DateTime.Now.Month >= 8 ? 0 : 1); 
            return context.Students.Where(s => s.YearEnteredPrimary == yearEnteredPrimary && s.ClassNumber == className.ClassNumber).ToList();
        }
    }
}
//new Date().getMonth() > 9 ? parseInt(new Date().getFullYear()) - student.yearEnteredPrimary : parseInt(new Date().getFullYear()) - student.yearEnteredPrimary}
