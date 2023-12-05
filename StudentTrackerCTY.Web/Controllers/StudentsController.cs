using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentTrackerCTY.Data;
using StudentTrackerCTY.Web.Models;
using System;

namespace StudentTrackerCTY.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly string _connectionString;
        public StudentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("AddStudent")]
        public void AddStudents(Student s)
        {
            var studentRepo = new StudentRepository(_connectionString);
            studentRepo.AddStudent(s);
        }
        [HttpPost]
        [Route("EditStudent")]
        public void EditStudent(Student s)
        {
            var studentRepo = new StudentRepository(_connectionString);
            studentRepo.EditStudent(s);
        }
        [HttpPost]
        [Route("DeleteStudent")]
        public void DeleteStudent(DeleteViewModel vm)
        {
            var studentRepo = new StudentRepository(_connectionString);
            studentRepo.DeleteStudent(vm.Id);
        }
        [HttpGet]
        [Route("GetAllStudents")]
        public List<Student> GetStudents()
        {
            var studentRepo = new StudentRepository(_connectionString);
            return studentRepo.GetStudents();
        }
        [HttpGet]
        [Route("GetStudentById")]
        public Student GetStudentById(int id)
        {
            var studentRepo = new StudentRepository(_connectionString);
            return studentRepo.GetStudentById(id);
        }
        [HttpPost]
        [Route("AddNote")]
        public void AddNote(Note note)
        {
            var studentRepo = new StudentRepository(_connectionString);
            studentRepo.AddNote(note);
        }
        [HttpPost]
        [Route("DeleteNote")]
        public void DeleteNote(Note n)
        {
            var studentRepo = new StudentRepository(_connectionString);
            studentRepo.DeleteNote(n);
        }
        [HttpGet]
        [Route("getallclasses")]
        public Task<List<ClassName>> GetClassNames()
        {
            var studentRepo = new StudentRepository(_connectionString);
            var classes = studentRepo.GetAllClassesAsync();
            return classes;
        }
        [HttpGet]
        [Route("getstudentsbyclass")]
        public List<Student> GetStudentsByClass(int grade, string classNumber)
        {
            var studentRepo = new StudentRepository(_connectionString);
            //return new List<Student>();
            ClassName className = new ClassName
            {
                Grade = grade,
                ClassNumber = (ClassNumber)Enum.Parse(typeof(ClassNumber), classNumber)
            };

            return studentRepo.GetStudentsByClass(className);
        }
        [HttpPost]
        [Route("upload")]
        public void Upload(UploadViewModel viewModel)
        {
            string base64 = viewModel.Base64.Substring(viewModel.Base64.IndexOf(",") + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);

            var folderName = @"c:\CTY";
            var pathName = Path.Combine(folderName, "Classes");
            Directory.CreateDirectory(pathName);
            pathName = Path.Combine(pathName, viewModel.Name);
            var origPathName = pathName;
            var index = 1;

            while (System.IO.File.Exists(pathName))
            {
                pathName = origPathName + $"({index})";
                string ext = Path.GetExtension(pathName);
                index++;
            }

            using(FileStream fs = System.IO.File.Create(pathName))
            {
                fs.Write(imageBytes, 0, imageBytes.Length);
                //foreach(byte b in imageBytes)
                //{
                //    fs.WriteByte(b);
                //}
                
            }


           // var desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
           // System.IO.File.WriteAllBytes($"{desktopPath}/CTY", imageBytes);
            //System.IO.File.WriteAllBytes($"uploads/{viewModel.Name}", imageBytes);
        }
        // [HttpGet]
        //[Route("view")]
        //public IActionResult ViewImage()
        //{
        //    var client = new HttpClient();
        //    //byte[] imageData = System.IO.File.ReadAllBytes($"uploads/{name}");
        //    //return File(imageData, "image/jpeg");
        //    byte[] pdfBytes1 = client.GetByteArrayAsync("https://www.africau.edu/images/default/sample.pdf").Result;
        //    var desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        //    return File.WriteAllBytes(desktopPath, pdfBytes1);

        //    byte[] pdfBytes = client.GetByteArrayAsync($"{desktopPath} + aba.pdf").Result;
        //    return File(pdfBytes, "application/pdf");
        //    //File.WriteAllBytes("test.pdf", pdfBytes);

        //}

        //[HttpGet("download")]
        //public IActionResult GetBlobDownload([FromQuery] string link)
        //{
        //    var net = new HttpClient();
        //    //var data = net.DownloadData(link);
        //    //var content = new System.IO.MemoryStream(link);
        //    var contentType = "APPLICATION/octet-stream";
        //    var fileName = "something.bin";
        //    return File(content, contentType, fileName);
        //}

    }
}

