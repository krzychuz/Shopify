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
    public class DishIngredientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DishIngredientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DishIngredients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DishIngredient>>> GetFoodIngredients()
        {
            return await _context.DishIngredients.ToListAsync();
        }

        // GET: api/DishIngredients/dish/5
        [HttpGet("dish/{dishId}")]
        public async Task<ActionResult<IEnumerable<DishIngredient>>> GetIngredientsForDish(int dishId)
        {
            var dish = await _context.Dish
                .Where(dish => dish.Id == dishId)
                .Include(d => d.DishIngredients)
                    .ThenInclude(di => di.Ingredient)
                        .ThenInclude(i => i.UnitOfMeassure)
                .Include(dt => dt.DishType)
                .ToListAsync();
            
            var ingredients = dish.Single().DishIngredients.ToList();

            return ingredients;
        }

        // GET: api/DishIngredients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishIngredient>> GetDishIngredient(int id)
        {
            var dishIngredient = await _context.DishIngredients.FindAsync(id);

            if (dishIngredient == null)
            {
                return NotFound();
            }

            return dishIngredient;
        }

        // PUT: api/DishIngredients/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishIngredient(int id, DishIngredient dishIngredient)
        {
            if (id != dishIngredient.Id)
            {
                return BadRequest();
            }

            _context.Entry(dishIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishIngredientExists(id))
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

        // POST: api/DishIngredients
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DishIngredient>> PostDishIngredient(DishIngredient dishIngredient)
        {
            _context.DishIngredients.Add(dishIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDishIngredient", new { id = dishIngredient.Id }, dishIngredient);
        }

        // DELETE: api/DishIngredients/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DishIngredient>> DeleteDishIngredient(int id)
        {
            var dishIngredient = await _context.DishIngredients.FindAsync(id);
            if (dishIngredient == null)
            {
                return NotFound();
            }

            _context.DishIngredients.Remove(dishIngredient);
            await _context.SaveChangesAsync();

            return dishIngredient;
        }

        private bool DishIngredientExists(int id)
        {
            return _context.DishIngredients.Any(e => e.Id == id);
        }
    }
}
