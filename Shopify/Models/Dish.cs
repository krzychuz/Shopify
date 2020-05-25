using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class Dish
    {
        [Key]
        [ReadOnly(true)]
        public int Id { get; set; }
        public string Name { get; set; }

        public int DishTypeId { get; set; }
        [ReadOnly(true)]
        public DishType DishType { get; set; }

        [ReadOnly(true)]
        public IList<DishIngredient> DishIngredients { get; set; }
    }
}
