using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Sql Connection

var connectionString = builder.Configuration.GetConnectionString("ProductCatalog");
builder.Services.AddDbContextFactory<ProductCatalogDbContext>(options =>
    options.UseSqlServer(connectionString));

#endregion

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();


app.MapControllers();

app.Run();