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
    public class SpecializationController : ControllerBase
    {
        private readonly ISpecializationService _service;

        public SpecializationController(ISpecializationService service)
        {
            _service = service;
        }

        [HttpGet]
        public  ActionResult<List<Specialization>> GetSpecializations([FromQuery] int EmployerId)
        {
            var resultExist = _service.CheckEmployerExist(EmployerId);
            if (!resultExist) return BadRequest();

            var result = _service.GetSpecializations(EmployerId);
            return Ok(result);
        }

        [HttpPut]
        public IActionResult AddSpecialization([FromBody] SpecializationAddDTO request)
        {
            var resultExist = _service.CheckEmployerExist(request.EmployerId);
            if (!resultExist) return BadRequest();
            
            _service.AddSpecialization(request);
            return Ok();
            
        }

        [HttpPost]
        public ActionResult<Specialization> EditSpecialization([FromBody] SpecializationEditDTO request)
        {
            var resultExist = _service.CheckSpecializationExist(request.Id);
            if (!resultExist) return BadRequest();

            _service.EditSpecialization(request);
            return Ok();
        }

        [HttpGet("checkCanModify")]
        public ActionResult<Specialization> CheckIfCanModifySpecialization([FromQuery] int specializationId, int employerId)
        {
            var requestExist = _service.CheckEmployerAndSpecializationExist(specializationId, employerId);
            if(!requestExist) return BadRequest();

            var result = _service.CheckIfSpecializationIsWithoutEmployee(specializationId, employerId);

            if (result) return Ok();
            else return BadRequest();
        }

        [HttpDelete]
        public ActionResult<Specialization> DeleteSpecialization([FromQuery] int specializationId)
        {
            var resultExist = _service.CheckSpecializationExist(specializationId);
            if(!resultExist) return BadRequest();

            _service.DeleteSpecialization(specializationId);
            return Ok();
        }

    }
}
