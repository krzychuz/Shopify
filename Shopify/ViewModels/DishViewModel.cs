using Shopify.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.ViewModels
{
    public class DishViewModel
    {
        public Dish Dish { get; set; }

        public IEnumerable<Ingredient> Ingredients { get; set; }
    }
}
