using Shopify.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.ViewModels
{
    public class IngredientViewModel
    {
        public Ingredient Ingredient { get; set; }

        public UnitOfMeassure UnitOfMeassure { get; set; }
    }
}
