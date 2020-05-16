using Shopify.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.ViewModels
{
    public class DIshIngredientViewModel
    {
        public DishIngredient DishIngredient { get; set; }

        public Ingredient Ingredient { get; set; }
    }
}
