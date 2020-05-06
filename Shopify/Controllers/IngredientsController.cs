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
    public class IngredientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IngredientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Ingredients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredient()
        {
            var allIngredients = await _context.Ingredient.ToListAsync();

            foreach (var ingredient in allIngredients)
                ingredient.UnitOfMeassure = _context.UnitOfMeassure.Find(ingredient.UnitOfMeassureId);

            return allIngredients;
        }

        // GET: api/Ingredients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ingredient>> GetIngredient(int id)
        {
            var Ingredient = await _context.Ingredient.FindAsync(id);

            if (Ingredient == null)
            {
                return NotFound();
            }

            return Ingredient;
        }

        // PUT: api/Ingredients/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredient(int id, Ingredient Ingredient)
        {
            if (id != Ingredient.Id)
            {
                return BadRequest();
            }

            _context.Entry(Ingredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientExists(id))
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

        // POST: api/Ingredients
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Ingredient>> PostIngredient(Ingredient Ingredient)
        {
            _context.Ingredient.Add(Ingredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIngredient", new { id = Ingredient.Id }, Ingredient);
        }

        // DELETE: api/Ingredients/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ingredient>> DeleteIngredient(int id)
        {
            var Ingredient = await _context.Ingredient.FindAsync(id);
            if (Ingredient == null)
            {
                return NotFound();
            }

            _context.Ingredient.Remove(Ingredient);
            await _context.SaveChangesAsync();

            return Ingredient;
        }

        private bool IngredientExists(int id)
        {
            return _context.Ingredient.Any(e => e.Id == id);
        }
    }
}
