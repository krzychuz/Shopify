using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopify.Data;
using Shopify.Models;

namespace Shopify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitOfMeassuresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UnitOfMeassuresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UnitOfMeassures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitOfMeassure>>> GetUnitOfMeassure()
        {
            return await _context.UnitOfMeassure.ToListAsync();
        }

        // GET: api/UnitOfMeassures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UnitOfMeassure>> GetUnitOfMeassure(int id)
        {
            var unitOfMeassure = await _context.UnitOfMeassure.FindAsync(id);

            if (unitOfMeassure == null)
            {
                return NotFound();
            }

            return unitOfMeassure;
        }

        // PUT: api/UnitOfMeassures/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUnitOfMeassure(int id, UnitOfMeassure unitOfMeassure)
        {
            if (id != unitOfMeassure.Id)
            {
                return BadRequest();
            }

            _context.Entry(unitOfMeassure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UnitOfMeassureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UnitOfMeassures
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UnitOfMeassure>> PostUnitOfMeassure(UnitOfMeassure unitOfMeassure)
        {
            _context.UnitOfMeassure.Add(unitOfMeassure);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUnitOfMeassure", new { id = unitOfMeassure.Id }, unitOfMeassure);
        }

        // DELETE: api/UnitOfMeassures/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UnitOfMeassure>> DeleteUnitOfMeassure(int id)
        {
            var unitOfMeassure = await _context.UnitOfMeassure.FindAsync(id);
            if (unitOfMeassure == null)
            {
                return NotFound();
            }

            _context.UnitOfMeassure.Remove(unitOfMeassure);
            await _context.SaveChangesAsync();

            return unitOfMeassure;
        }

        private bool UnitOfMeassureExists(int id)
        {
            return _context.UnitOfMeassure.Any(e => e.Id == id);
        }
    }
}
