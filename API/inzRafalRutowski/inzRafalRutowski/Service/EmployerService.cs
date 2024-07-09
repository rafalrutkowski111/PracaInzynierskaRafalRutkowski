using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace inzRafalRutowski.Service
{
    public class EmployerService : IEmployerService
    {
        private readonly DataContext _context;

        public EmployerService(DataContext context)
        {
            _context = context;
        }
        public Employer GetEmployer(int employerId)
        {
            return _context.Employers.FirstOrDefault(x => string.Equals(x.Id, employerId));
        }

        public Employer Login(string login, string password)
        {
            return _context.Employers.FirstOrDefault(x => string.Equals(x.Login, login) && string.Equals(x.Password, password));
        }

        public Employer VeryfieLogin(int userId)
        {
            return _context.Employers.FirstOrDefault(x => string.Equals(x.Id, userId));
        }

        public StringBuilder Hush(Employer employer)
        {
            byte[] data = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes($"{employer.Id}_{employer.Login}_{employer.Password}"));
            var builder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                builder.Append(data[i].ToString("x2"));
            }
            return builder;
        }

    }
}
