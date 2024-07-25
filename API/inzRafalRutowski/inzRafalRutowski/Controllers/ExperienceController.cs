using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Experiance;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : HomeController
    {
        private readonly DataContext _context;
        private readonly IExperienceService _service;
        private readonly IJwtService _jwtService;

        public ExperienceController(DataContext context, IExperienceService service, IJwtService jwtService)
        {
            _context = context;
            _service = service;
            _jwtService = jwtService;
        }
        public bool CheckAuthoriationOwnUserOrAdmin(int employerId)
        {
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            var claimId = int.Parse(token.Claims.First(c => c.Type == "nameid").Value);
            var claimAdmin = token.Claims.First(c => c.Type == "admin").Value;

            if (claimId == employerId || claimAdmin == "True")
                return true;
            else return false;
        }

        //[Authorize(Policy = IdentityData.AdminUserPolicyName)]
        //[Authorize]
        //[RequiresClaim(IdentityData.AdminUserClaimName, "False")]
        //rhtgegyhrtgyhe("asdasd")]
        [Authorize]
        [HttpGet]
        public ActionResult<List<Experience>> GetExperience([FromQuery] int employerId)
        {
            //Zapytać sie przy okazji jak rozwiązać sprawe autoryzacji po stronie fronta
            // bo jezeli uzywamy [Authorize] to przy zapytaniu musimy wyslac token
            // a zeby to zrobic trzeba go gdzies przetrzymywac na froncie
            // mozna zrobic to w local storage, ale to chyba nie jest najlepsze miejsce do przechowywania takich rzeczy

            if (!CheckAuthoriationOwnUserOrAdmin(employerId)) return Unauthorized();

            var result = _service.GetExperience(employerId);
            if (result == null) return BadRequest("Id pracodawny jest niepoprawne");
            else return Ok(result);

            //try
            //{
            //    var jwt = Request.Cookies["jwt"];

            //    var token = _jwtService.Verify(jwt);

            //    int employerIdFromToken = int.Parse(token.Issuer);

            //    if (employerId != employerIdFromToken) return Unauthorized();

            //    var resultAction = _service.GetExperience(employerId);
            //    if (resultAction == null) return BadRequest("Id pracodawny jest niepoprawne");
            //    return Ok(resultAction);
            //}
            //catch (Exception _)
            //{
            //    return Unauthorized();
            //}


            //var result = _service.GetExperience(employerId);
            //if (result == null) return BadRequest("Id pracodawny jest niepoprawne");
            //else return Ok(result);
        }

        [HttpPut]
        public IActionResult AddExperience([FromBody] Experience request)
        {       
            return Ok(_service.AddExperience(request));
        }
        [HttpPost]

        public ActionResult<Experience> EditExperience([FromBody] EditExperianceDTO request)
        {
            var result = _service.EditExperience(request);

            if (!result) return BadRequest("Id doświadczenia jest niepoprawne");
            return Ok();
        }

        [HttpGet("checkCanModify")]
        public ActionResult<Experience> CheckIfCanModifyExperience([FromQuery] int experianceId, int employerId, int value, bool edit)
        {
            var canModify = true;
            var listEmployees = _context.Employees.Where(x => int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.ExperienceId, experianceId)) != null)
                    canModify = false;

            });

            if (edit && (_context.Experiences.First(x => int.Equals(x.Id, experianceId)).ExperienceValue == value))
                canModify = true;
            return Ok(canModify);
        }

        [HttpDelete]
        public ActionResult<Experience> DeleteExperience(int experianceId)
        {
            var result = _context.Experiences.First(x => int.Equals(x.Id, experianceId));
            _context.Experiences.Remove(result);
            _context.SaveChanges();
            return Ok();
        }
    }
}
