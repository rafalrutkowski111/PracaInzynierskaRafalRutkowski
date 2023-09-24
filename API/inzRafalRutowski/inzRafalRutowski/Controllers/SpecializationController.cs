﻿using inzRafalRutowski.Data;
using inzRafalRutowski.DTO;
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

        [HttpPost]
        public IActionResult AddSpecialization([FromBody] Specialization request)
        {
            _context.Specializations.Add(request);
            _context.SaveChanges();

            return Ok();
        }
    }
}
