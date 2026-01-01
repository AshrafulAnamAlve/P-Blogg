using Microsoft.EntityFrameworkCore;

namespace ApiBlogg.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Register> Registers { get; set; }
        public DbSet<Blogg> Bloggs { get; set; }
    }
}
