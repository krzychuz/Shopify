using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class DishType
    {
        [Key]
        [ReadOnly(true)]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public IList<Dish> Dishes { get; set; }
    }
}
