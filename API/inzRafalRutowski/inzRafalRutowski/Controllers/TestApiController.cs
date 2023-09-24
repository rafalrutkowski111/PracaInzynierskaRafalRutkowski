using Azure.Core;
using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
using inzRafalRutowski.Models;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestApiController : ControllerBase
    {
        private readonly ITestApiService _service;

        public TestApiController(ITestApiService service)
        {
            _service = service;
        }

        
        [HttpGet] //api/testApi
        public async Task<ActionResult<List<Employer>>> GetEmployers()
        {
            if (false)
            {
                return BadRequest();
            }

            var result = await _service.GetEmployers();
            return Ok(result);
        }

        [HttpGet("{id}")] //api/testApi/numberID
        //[Route("{id}")]  alternatywnie można użyć
        //[FromRoute] Pobiera wartości z danych trasy
        //[FromBody] Pobiera wartości z treści żądania
        //[FromQuery]  Pobiera wartości z ciągu zapytania -w postmanie testuje się Parms-> key,value lub w sciezce np ?key=50
        public async Task<ActionResult<Employer>> GetEmployer([FromRoute] int id)
        {
            var result = await _service.GetEmployer(id);
            return Ok(result);
        }
        
        

        [HttpPost] //api/testApi
        public async Task<ActionResult<Employer>> AddEmployer([FromBody]EmployerDTO request)
        {

            var result = await _service.AddEmployer(request);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<Employer>> UpdateEmployer(EmployerDTO request)
        {
            var result = await _service.UpdateEmployer(request);

            if (result == null)
                return BadRequest("Miss Employer");
           
            return Ok(result);
        }

        
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Employer>> DeleteEmployer(int id)
        {

            var result = await _service.DeleteEmployer(id);

            if (result == null)
                return BadRequest("Miss Employer");

                return Ok("Poprawnie usunięto pracodawce");
        }
        
        
    }
}
