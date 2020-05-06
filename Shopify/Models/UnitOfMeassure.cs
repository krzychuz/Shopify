using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.Models
{
    public class UnitOfMeassure
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
