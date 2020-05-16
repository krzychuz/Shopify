using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopify.Data;
using Shopify.Models;

namespace Shopify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DishTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DishTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DishType>>> GetDishType()
        {
            return await _context.DishType.ToListAsync();
        }

        // GET: api/DishTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishType>> GetDishType(int id)
        {
            var dishType = await _context.DishType.FindAsync(id);

            if (dishType == null)
            {
                return NotFound();
            }

            return dishType;
        }

        // PUT: api/DishTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishType(int id, DishType dishType)
        {
            if (id != dishType.Id)
            {
                return BadRequest();
            }

            _context.Entry(dishType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishTypeExists(id))
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

        // POST: api/DishTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DishType>> PostDishType(DishType dishType)
        {
            _context.DishType.Add(dishType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDishType", new { id = dishType.Id }, dishType);
        }

        // DELETE: api/DishTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DishType>> DeleteDishType(int id)
        {
            var dishType = await _context.DishType.FindAsync(id);
            if (dishType == null)
            {
                return NotFound();
            }

            _context.DishType.Remove(dishType);
            await _context.SaveChangesAsync();

            return dishType;
        }

        private bool DishTypeExists(int id)
        {
            return _context.DishType.Any(e => e.Id == id);
        }
    }
}
