using ApiBlogg.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;

namespace ApiBlogg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class BloggController : ControllerBase
    {
        private readonly AppDbContext context;
        private readonly IWebHostEnvironment env;
        private readonly EmailService _emailService;

        public BloggController(AppDbContext _context, IWebHostEnvironment _env, EmailService emailService)
        {
            context = _context;
            this.env = _env;
            _emailService = emailService;
        }

        [HttpPost("Register")]
        public ActionResult Register(Register obj)
        {
            if(obj == null) return BadRequest("Null");

            bool userExists = context.Registers.Any(u => u.userName == obj.userName && u.email==obj.email);
            if (userExists) return BadRequest("User already exists");
            if(obj.password != obj.confirmPassword) return BadRequest("Passwords do not match");

            context.Registers.Add(obj);
            context.SaveChanges();
            return Ok("User registered successfully");
        }

        [HttpPost("Login")]
        public ActionResult Login(Login obj)
        {
            if(obj == null) return BadRequest("Null");
            var user = context.Registers.FirstOrDefault(u => u.email == obj.email && u.password == obj.password);
            if(user == null) return BadRequest("Invalid email or password");
            return Ok(new {message="Login Seccusfull",userid=user.id});
        }

        [HttpPost("AddBlogg")]
        public ActionResult AddBlogg([FromBody]Blogg Obj)
        {
            if(Obj==null) return BadRequest("Null");
            Obj.Date = DateTime.Now;
            context.Bloggs.Add(Obj);
            context.SaveChanges();
            return Ok("Blogg added successfully");
        }

        [HttpGet("getAllblogg")]
        public ActionResult getAllblogg()
        {
            var blog = context.Bloggs.ToList();
            return Ok(blog);
        }

        [HttpGet("getBlogbyid/{id}")]
        public ActionResult getBlogbyid(int id)
        {
            var blog =context.Bloggs.FirstOrDefault(b=>b.id == id);
            if(blog==null) return NotFound("Blog not found");
            return Ok(blog);
        }

        [HttpGet("getUserDetls/{id}")]
        public ActionResult getUserDetls(int id)
        {
            var user = context.Registers.FirstOrDefault(u => u.id == id);
            if (user == null) return NotFound("User not found");

            return Ok(user);
        }

        [HttpGet("getUserBloggs/{id}")]
        public ActionResult getUserBloggs(int id)
        {
            var bloggs = context.Bloggs.Where(b => b.userId == id).ToList();
            if(bloggs == null || bloggs.Count == 0) return NotFound("No blogs found for this user");
            return Ok(bloggs);

        }

      

        [HttpPut("editBlogg/{id}")]
        public ActionResult editBlogg(int id, Blogg obj)
        {
            var blog = context.Bloggs.FirstOrDefault(b => b.id == id);
            if (blog == null) return NotFound("Blog Not found");

            blog.title = obj.title;
            blog.category = obj.category;
            blog.description = obj.description;

            context.SaveChanges();
            return Ok("Blog Edit Successfull");
        }

        [HttpDelete("deleteBlogg/{id}")]
        public ActionResult deleteBlogg(int id)
        {
            var blog = context.Bloggs.FirstOrDefault(b => b.id == id);
            if (blog == null) return NotFound("Blog Not found");
            context.Bloggs.Remove(blog);
            context.SaveChanges();
            return Ok("Blog Deleted Successfull");
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file selected");

            // Image save korar folder
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Unique name
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

      // Client e return korbo image er path
        var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";

      return Ok(new { imageUrl });
        }

        [HttpPost("sendEmail")]
        public ActionResult sendEmail(Contact obj)
        {
            if(string.IsNullOrEmpty(obj.name) || string.IsNullOrEmpty(obj.email) || string.IsNullOrEmpty(obj.message))
            
                return BadRequest("All fields are required");
            string subject = "New Contact Message from " + obj.name;
            string body = $@"
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> {obj.name}</p>
            <p><strong>Email:</strong> {obj.email}</p>
            <p><strong>Message:</strong> {obj.message}</p>
            ";
            _emailService.SendEmail(obj.email, subject, body);
            return Ok("Email sent successfully");
        }

    [HttpGet("getUserByBlogg/{id}")]
    public ActionResult getUserByBlog(int id)
    {
      var user = context.Registers.FirstOrDefault(u=> u.id == id);
      if(user == null) return NotFound("User not found");
      return Ok(user);

    }


  }
}
