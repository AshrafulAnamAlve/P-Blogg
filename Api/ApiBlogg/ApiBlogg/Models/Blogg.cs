using System.ComponentModel.DataAnnotations;

namespace ApiBlogg.Models
{
    public class Blogg
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string category { get; set; }
        public DateTime Date { get; set; }
        public string? imageUrl { get; set; }
        public int userId { get; set; }
    }
}
