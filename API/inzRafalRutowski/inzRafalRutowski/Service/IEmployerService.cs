using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace inzRafalRutowski.Service
{
    public interface IEmployerService
    {
        Employer Login(string login, string password);
        IActionResult VeryfieLogin(int userId, string hash);
        IActionResult GetEmployer(int employerId);
        StringBuilder Hush(Employer employer);
    }
}
