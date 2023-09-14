using inzRafalRutowski.Data;
using inzRafalRutowski.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestApiController : ControllerBase
    {
        private readonly DataContext _context;

        public TestApiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] //api/testApi
        public async Task<ActionResult<List<Employer>>> GetEmployers()
        {
            return await _context.Employers.ToListAsync();
        }

        [HttpGet("{id}")] //api/testApi/numberID
        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            return await _context.Employers.FindAsync(id);
        }
    }
}
