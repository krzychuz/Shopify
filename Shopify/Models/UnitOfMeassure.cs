using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class UnitOfMeassure
    {
        [Key]
        [ReadOnly(true)]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public IList<Ingredient> Ingredients { get; set; }
    }
}
