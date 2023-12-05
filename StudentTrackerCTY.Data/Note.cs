using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StudentTrackerCTY.Data
{
    public class Note
    {
        public int Id { get; set; }
        //public string Title { get; set; }
        public string Text { get; set; }
        public int StudentId { get; set; }
        [JsonIgnore]
        public Student Student { get; set; }
    }
}
