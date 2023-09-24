using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] EmployeeDTO request)
        {
            return Ok();
        }

        
    }
}
