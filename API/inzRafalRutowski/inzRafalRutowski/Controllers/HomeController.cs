using inzRafalRutowski.Identity;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
namespace inzRafalRutowski.Controllers
{
    public class HomeController : Controller
    {
        private readonly IJwtService _jwtService;
        public HomeController( IJwtService jwtService)
        {
            _jwtService = jwtService;
        }

        //metoda wykonująca się przed kontrolerami akcji. W przyszłości można wykorzystać do zrobienia dynamicznej autentykacji
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

        }
        // metoda wykorzystywana do autoryzacji, na razie nie mam pomysłu jak autoryzować aby konkretna osoba mogła skorzystać z
        // metody lub osoba o pewnych uprawnieniach za pomocą atrybutów (nie można dynamicznie przekazywać wartości)
        protected bool CheckAuthoriationOwnUserOrAdmin(int employerId)
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            var claimId = int.Parse(token.Claims.First(c => c.Type == "nameid").Value);
            var claimAdmin = token.Claims.First(c => c.Type == "admin").Value;

            if (claimId == employerId || claimAdmin == "True")
                return true;
            else return false;
        }
    }
}
