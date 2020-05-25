using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class Ingredient
    {
        [Key]
        [ReadOnly(true)]
        public int Id { get; set; }
        public string Name { get; set; }

        public int UnitOfMeassureId { get; set; }
        [ReadOnly(true)]
        public UnitOfMeassure UnitOfMeassure { get; set; }

        [JsonIgnore]
        public IList<DishIngredient> DishIngredients { get; set; }
    }
}
