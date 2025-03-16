using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Crypto;
using ProductCatalog.Service;
using ProductCatalog.Service.Api;

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

        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique();

        modelBuilder.Entity<Block>()
            .HasOne(b => b.User)
            .WithMany(u => u.Blocks)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Block>()
            .HasOne(b => b.Administrator)
            .WithMany()
            .HasForeignKey(b => b.AdministratorId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Category>()
            .HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.NoAction);  // Нет каскадного удаления для связи User

        //modelBuilder.Entity<Category>()
        //    .HasOne(c => c.Parent)
        //    .WithMany(c => c.Children)
        //    .HasForeignKey(c => c.ParentId)
        //    .OnDelete(DeleteBehavior.NoAction);  // Нет каскадного удаления для связи Parent


        CreateDefaultAdministrator(modelBuilder);
    }

    private User CreateDefaultAdministrator(ModelBuilder modelBuilder)
    {
        var pwd = ShaHasher.Sha256("123123123");

        var admin = new User()
        {
            Id = new Guid("00000000-0000-0000-0000-000000000001"),
            FirstName = "Администратор",
            Email = "admin@mail.ru",
            PasswordHash = pwd,
            Role = Roles.Admin
        };

        modelBuilder
            .Entity<User>()
            .HasData(admin);

        return admin;
    }
}
