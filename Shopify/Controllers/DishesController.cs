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
    public class DishesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DishesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Dishes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dish>>> GetDish()
        {
            var allDishes = await _context.Dish.Include(d => d.Ingredients).ToListAsync();


            foreach (var dish in allDishes)
            {
                foreach (var ingredient in dish.Ingredients)
                {
                    ingredient.Ingredient = _context.Ingredient.Find(ingredient.IngredientId);
                    ingredient.Ingredient.UnitOfMeassure = _context.UnitOfMeassure.Find(ingredient.Ingredient.UnitOfMeassureId);
                }
            }

            return allDishes;
        }

        // GET: api/Dishes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dish>> GetDish(int id)
        {
            var dish = await _context.Dish.FindAsync(id);

            if (dish == null)
            {
                return NotFound();
            }

            return dish;
        }

        // PUT: api/Dishes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDish(int id, Dish dish)
        {
            if (id != dish.Id)
            {
                return BadRequest();
            }

            _context.Entry(dish).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishExists(id))
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

        // POST: api/Dishes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Dish>> PostDish(Dish dish)
        {
            _context.Dish.Add(dish);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDish", new { id = dish.Id }, dish);
        }

        [HttpPost("{id}/ingredient")]
        public async Task<ActionResult<Dish>> PostIngredient(int id, FoodIngredient foodIngredient)
        {
            var dish = await _context.Dish.FindAsync(id);
            if (dish == null)
                return NotFound();

            var ingredient = await _context.Ingredient.FindAsync(foodIngredient.IngredientId);
            if (ingredient == null)
                return NotFound();

            if (dish.Ingredients == null)
                dish.Ingredients = new List<FoodIngredient>();

            dish.Ingredients.Add(foodIngredient);
            _context.Entry(dish).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Dishes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Dish>> DeleteDish(int id)
        {
            var dish = await _context.Dish.FindAsync(id);
            if (dish == null)
            {
                return NotFound();
            }

            _context.Dish.Remove(dish);
            await _context.SaveChangesAsync();

            return dish;
        }

        private bool DishExists(int id)
        {
            return _context.Dish.Any(e => e.Id == id);
        }
    }
}
