using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class FoodIngredient
    {
        [Key]
        public int Id { get; set; }
        public double Amount { get; set; }
        public int IngredientId { get; set; }
        public virtual Ingredient Ingredient {get; set; }
    }
}
