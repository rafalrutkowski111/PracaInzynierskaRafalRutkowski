using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace inzRafalRutowski.Service
{
    public class EmployerService : IEmployerService
    {
        // zrobić testy jednostkowe

        // czym sie rozni np ActionResult<Employer> or samego Employer w controllerach, czy powinno sie uzywac zawsze actionresult lub iactionresult w controllerach?

        // czy jak zorbie np. ActionResult<Employer> i robie do niej metode w serwisie (np ten serwis) to czy powinienem robic tez ActionResult<Employer>
        // cz może jednak wystarczy samo Employer?, a jeżeli ActionResult<Employer> to co jak zwrot to musi byc Employer(bo się potem), to powinienem potem to zmapowac?

        // lepiej uzywac actionresult czy iactionresult?
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
            //beda 2 przypadki 1 jezeli wpiszemy cos zle lub nic, 2 jezeli poprawnie
            return _context.Employers.FirstOrDefault(x => string.Equals(x.Login, login) && string.Equals(x.Password, password));
        }

        public Employer VeryfieLogin(int userId)
        {
            return _context.Employers.FirstOrDefault(x => string.Equals(x.Id, userId));
        }

        public StringBuilder Hush(Employer employer)
        {
            // czy mam tu sprawdzać czy employer istnieje, jesli w metodzie
            // nadrzednej nei wykona sie ta metoda jeśli go nie ma?

            //jezeli posiadamy employera zawsze popranwnie wykona sie metoda
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
