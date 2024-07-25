using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
namespace inzRafalRutowski.Controllers
{
    public class HomeController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //tu zrobic autentykacje
        }
    }
}
