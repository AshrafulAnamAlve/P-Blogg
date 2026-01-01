using System.Net;
using System.Net.Mail;

namespace ApiBlogg
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string email, string subject, string body)
        {
            var fromEmail = _configuration["Constants:FromEmail"];
            var password = _configuration["Constants:EmailPassword"];

            var message = new MailMessage();
            message.From = new MailAddress(fromEmail);
            message.To.Add(fromEmail);
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;

            message.ReplyToList.Add(new MailAddress(email));

            using var smtp = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(fromEmail, password),
                EnableSsl = true
            };
            smtp.Send(message);
        }
    }
}
