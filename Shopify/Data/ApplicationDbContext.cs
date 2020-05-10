using Shopify.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shopify.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<Shopify.Models.Dish> Dish { get; set; }
        public DbSet<Shopify.Models.Ingredient> Ingredient { get; set; }
        public DbSet<Shopify.Models.UnitOfMeassure> UnitOfMeassure { get; set; }

        public DbSet<Shopify.Models.FoodIngredient> FoodIngredients { get; set; }
    }
}
