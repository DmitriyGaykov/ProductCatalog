using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Utils.Pagination;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ProductCatalog.Service.V1.Services;

public class ProductsService : IProductsService
{
    private readonly ProductCatalogDbContext _context;

    public ProductsService(ProductCatalogDbContext context)
    {
        _context = context;
    }

    public async Task<Product> AddAsync(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<IEnumerable<Product>> FindAllAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("userid", out var userId);
        queries.TryGetValue("categoryid", out var categoryId);
        queries.TryGetValue("q", out var q);
        queries.TryGetValue("pricefrom", out var s_priceFrom);
        queries.TryGetValue("priceto", out var s_priceTo);
        queries.TryGetValue("sortby", out var sortBy);
        queries.TryGetValue("ordertype", out var ordertype);
        queries.TryGetValue("limit", out var s_limit);
        queries.TryGetValue("page", out var s_page);

        var (skip, limit) = SkipLimitExtractor.ExtractSkipAndLimitFrom(s_page, s_limit);

        if (!int.TryParse(s_priceFrom, out var priceFrom))
            priceFrom = int.MinValue;

        if (!int.TryParse(s_priceTo, out var priceTo))
            priceTo = int.MaxValue;

        var filteredData = _context
            .Products
            .Include(p => p.User)
            .Where(p =>
                p.DeletedAt == null &&
                (userId == null || p.UserId.Equals(new Guid(userId))) &&
                (categoryId == null || p.CategoryId.Equals(new Guid(categoryId))) &&
                (q == null || p.Name.ToLower().Contains(q) || p.Description.ToLower().Contains(q) || (p.Notes != null && p.Notes.ToLower().Contains(q))) &&
                (p.Price >= priceFrom && p.Price <= priceTo)
            )
            .AsQueryable();

        ordertype ??= "asc";

        switch (sortBy)
        {
            case "price":
                filteredData = ordertype.Equals("desc") ?
                    filteredData.OrderByDescending(p => p.Price) :
                    filteredData.OrderBy(p => p.Price);
                break;
            case "name":
            default:
                filteredData = ordertype.Equals("desc") ?
                   filteredData.OrderByDescending(p => p.Name) :
                   filteredData.OrderBy(p => p.Name);
                break;
        }

        queries[WebApiConfig.CountElementsKey] = (await filteredData.CountAsync()).ToString();

        return await filteredData
            .Skip(skip)
            .Take(limit)
            .ToListAsync();
    }

    public Task<Product?> FindByIdAsync(Guid id)
    {
        return _context
            .Products
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Id.Equals(id));
    }

    public async Task RemoveAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("categoryid", out var categoryId);
        queries.TryGetValue("userid", out var userId);
        queries.TryGetValue("ids", out var ids);
        queries.TryGetValue("advanceduserid", out var advancedUserId);

        var productIds = ids?
            .Split("|")
            ?.Where(id => Guid.TryParse(id, out var productId))
            .Select(Guid.Parse)
            .Distinct()
            .ToList();

        await _context
            .Products
            .Include(p => p.User)
            .Where(p =>
                (userId == null || p.UserId.Equals(new Guid(userId))) &&
                (categoryId == null || p.CategoryId.Equals(new Guid(categoryId))) &&
                (ids == null || (productIds != null && productIds.Contains(p.Id))) &&
                (advancedUserId == null || p.User.Role.Equals(Roles.User) || p.UserId.Equals(new Guid(advancedUserId)))
            )
            .ExecuteUpdateAsync(setters =>
                setters.SetProperty(p => p.DeletedAt, DateTime.Now)
            );
    }

    public async Task<Product> RemoveAsync(Product product)
    {
        product.DeletedAt = DateTime.Now;
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> UpdateAsync(Product product)
    {
        product.ModifiedAt = DateTime.Now;
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return product;
    }
}
