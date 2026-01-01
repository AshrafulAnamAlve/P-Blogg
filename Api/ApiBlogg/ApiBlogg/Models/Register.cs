using System.ComponentModel.DataAnnotations;

namespace ApiBlogg.Models
{
    public class Register
    {
        [Key]
        public int id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string confirmPassword { get; set; }
    }
}
