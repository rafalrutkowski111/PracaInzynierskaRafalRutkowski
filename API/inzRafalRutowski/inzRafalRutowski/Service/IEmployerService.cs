using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace inzRafalRutowski.Service
{
    public interface IEmployerService
    {
        Employer Login(string login, string password);
        Employer VeryfieLogin(Guid userId);
        Employer GetEmployerById(int employerId);
        StringBuilder Hush(Employer employer);
    }
}
