using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using inzRafalRutowski.DTO.Specialization;
using inzRafalRutowski.Models;
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

        public SpecializationController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public  ActionResult<List<Specialization>> GetSpecializations([FromQuery] int EmployerId)
        {

            var result = _context.Specializations.Where(x => int.Equals(x.EmployerId, EmployerId) || int.Equals(x.EmployerId, null)).ToList();

            return Ok(result);
        }

        [HttpPut]
        public IActionResult AddSpecialization([FromBody] SpecializationAddDTO request)
        {
            Specialization specialization = new Specialization()
            {
                EmployerId = request.EmployerId,
                Name = request.Name
            };

            _context.Specializations.Add(specialization);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public ActionResult<Specialization> Edit([FromBody] SpecializationEditDTO request)
        {
            _context.Specializations.First(x=> int.Equals(x.Id, request.Id)).Name = request.Name;
            _context.SaveChanges();
            return Ok();
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
