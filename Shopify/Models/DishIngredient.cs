using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class DishIngredient
    {
        [Key]
        [ReadOnly(true)]
        public int Id { get; set; }
        public double Amount { get; set; }

        public int IngredientId { get; set; }
        [ReadOnly(true)]
        public Ingredient Ingredient { get; set; }

        public int DishId { get; set; }
        [ReadOnly(true)]
        public Dish Dish { get; set; }
    }
}
