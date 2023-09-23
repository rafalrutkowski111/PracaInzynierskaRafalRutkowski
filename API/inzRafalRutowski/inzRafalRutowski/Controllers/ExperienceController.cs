using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly DataContext _context;

        public ExperienceController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddExperience([FromBody] Experience request)
        {
            _context.Experience.Add(request);
            _context.SaveChanges();
            return Ok(request);
        }
    }
}
