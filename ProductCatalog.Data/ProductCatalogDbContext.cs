using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Crypto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Data;

public class ProductCatalogDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Block> Blocks { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }

    public ProductCatalogDbContext(DbContextOptions<ProductCatalogDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Block>()
            .HasOne(b => b.User)
            .WithMany()  
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Block>()
            .HasOne(b => b.Administrator)
            .WithMany() 
            .HasForeignKey(b => b.AdministratorId)
            .OnDelete(DeleteBehavior.NoAction);

        CreateDefaultAdministrator(modelBuilder);
    }

    private User CreateDefaultAdministrator(ModelBuilder modelBuilder)
    {
        var pwd = ShaHasher.Sha256("123123123");

        var admin = new User()
        {
            FirstName = "Администратор",
            Email = "admin@mail.by",
            PasswordHash = pwd,
            Role = Roles.Admin
        };

        modelBuilder
            .Entity<User>()
            .HasData(admin);

        return admin;
    }
}
