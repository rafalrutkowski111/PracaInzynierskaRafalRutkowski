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
        private readonly DataContext _context;
        private readonly ISpecializationService _service;

        public SpecializationController(DataContext context, ISpecializationService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public  ActionResult<List<Specialization>> GetSpecializations([FromQuery] int EmployerId)
        {

            var result = _service.GetSpecializations(EmployerId);

            if(result == null) return BadRequest(); //nie pamietam
            // czy wynikiem dla where moze bedzie null czy pusta tablica
            // przy testkach jednostkowych sprawdzic i dac poprawny warunek

            return Ok(result);
        }

        [HttpPut]
        public IActionResult AddSpecialization([FromBody] SpecializationAddDTO request)
        {
            var result = _service.AddSpecialization(request);

            if (result) return Ok();
            else return BadRequest();
            
        }

        [HttpPost]
        public ActionResult<Specialization> Edit([FromBody] SpecializationEditDTO request)
        {
            var result = _service.Edit(request);

            if (result) return Ok();
            else return BadRequest();
        }

        [HttpGet("checkCanModify")]
        public ActionResult<Specialization> CheckCanModify([FromQuery] int specializationId, int employerId)
        {
            var canModify = true;
            var listEmployees = _context.Employees.Where(x => int.Equals(x.EmployerId, employerId)).ToList();

            listEmployees.ForEach(x =>
            {
                if (_context.EmployeeSpecializations.FirstOrDefault(x2 => Guid.Equals(x2.EmployeeId, x.Id) &&
                int.Equals(x2.SpecializationId, specializationId)) != null)
                    canModify = false;
            });

            return Ok(canModify);
        }

        [HttpDelete]
        public ActionResult<Specialization> Delete([FromQuery] int specializationId)
        {
            _context.Specializations.Remove(_context.Specializations.First(x => int.Equals(x.Id, specializationId)));
            _context.SaveChanges();
            return Ok();
        }

    }
}
