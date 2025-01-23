using Azure.Core;
using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationController : HomeController
    {
        private readonly ISpecializationService _service;

        public SpecializationController(ISpecializationService service, IJwtService jwtService) : base(jwtService)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<List<Specialization>> GetSpecializations([FromQuery] int EmployerId)
        {
            var result = _service.GetSpecializations(EmployerId);
            if (result is null) return BadRequest(new { message = "Id pracodawcy jest niepoprawne" });
            else return Ok(result);
        }

        [HttpPut]
        public IActionResult AddSpecialization([FromBody] SpecializationAddDTO request)
        {    
            var result = _service.AddSpecialization(request);
            if(!result) return BadRequest(new { message = "Id pracodawcy jest niepoprawne" });
            else return Ok();
        }

        [HttpPost]
        public ActionResult<Specialization> EditSpecialization([FromBody] SpecializationEditDTO request)
        {
            var result = _service.EditSpecialization(request);
            if(!result) return BadRequest(new { message = "Id pracodawcy jest niepoprawne" });
            else return Ok();
        }

        [HttpGet("checkCanModify")]
        public ActionResult<Specialization> CheckIfCanModifySpecialization([FromQuery] int specializationId, int employerId)
        {
            var result = _service.CheckIfSpecializationIsWithoutEmployee(specializationId, employerId);

            if (result == 0) return Ok();
            else if (result == 1) return Ok( new
            {
                message =
                "Nie można dokonać zmian. Istnieje jeden lub więcej pracowników przypisanych do specjalizacji"
            });
            else if (result == -1) return BadRequest(new { message = "Id pracodawcy i id specjalizacji jest niepoprawne" });
            else if (result == -2) return BadRequest(new { message = "Id pracodawcy jest niepoprawne" });
            else return BadRequest(new { messgae = "Id specjalizacji jest niepoprawne" });
        }

        [HttpDelete]
        public ActionResult<Specialization> DeleteSpecialization([FromQuery] int specializationId)
        {
            var restult = _service.DeleteSpecialization(specializationId);
            if(!restult) return BadRequest(new { message = "Id pracodawcy jest niepoprawne" });
            return Ok();
        }

    }
}
