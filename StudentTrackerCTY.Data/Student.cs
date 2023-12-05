using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentTrackerCTY.Data
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int YearEnteredPrimary { get; set; }
        public ClassNumber ClassNumber { get; set; }
        public string HomeNumber { get; set; }
        public string MotherName { get; set; }
        public string FatherName { get; set; }
        public string MotherCell { get; set; }
        public string FatherCell { get; set; }
        public int AddressId { get; set; }
        //public List<int> NotesId { get; set; }
        public AddressDetails Address { get; set; }
        public List<Note> Notes { get; set; }
        //public List<SupportStaff> SupportStaff { get; set; }
    }
}
