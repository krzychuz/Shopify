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
        public DbSet<Dish> Dish { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<UnitOfMeassure> UnitOfMeassures { get; set; }
        public DbSet<DishIngredient> DishIngredients { get; set; }
        public DbSet<DishType> DishTypes { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    base.OnModelCreating(builder);

        //    builder.Entity<UnitOfMeassure>()
        //        .HasMany(uom => uom.Ingredients)
        //        .WithOne(i => i.UnitOfMeassure)
        //        .HasForeignKey(i => i.UnitOfMeassureId);
        //}
    }
}
