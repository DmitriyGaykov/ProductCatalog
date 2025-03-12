using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Utils.Pagination;

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
        queries.TryGetValue("limit", out var s_limit);
        queries.TryGetValue("page", out var s_page);
        queries.TryGetValue("q", out var q);
        queries.TryGetValue("description", out var description);
        queries.TryGetValue("pricefrom", out var s_priceFrom);
        queries.TryGetValue("priceto", out var s_priceTo);

        var (skip, limit) = SkipLimitExtractor.ExtractSkipAndLimitFrom(s_page, s_limit);

        if (!int.TryParse(s_priceFrom, out var priceFrom))
            priceFrom = int.MinValue;

        if (!int.TryParse(s_priceTo, out var priceTo))
            priceTo = int.MaxValue;

        throw new NotImplementedException();
    }

    public Task<Product?> FindByIdAsync(Guid id)
    {
        return _context
            .Products
            .FirstOrDefaultAsync(p => p.Id.Equals(id));
    }

    public async Task RemoveAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("categoryid", out var categoryId);
        queries.TryGetValue("ids", out var ids);

        var productIds = ids?
            .Split("|")
            ?.Where(id => Guid.TryParse(id, out var productId))
            .Select(Guid.Parse)
            .Distinct()
            .ToList();

        await _context
            .Products
            .Where(p =>
                (categoryId == null || p.CategoryId.Equals(new Guid(categoryId))) &&
                (ids == null || (productIds != null && productIds.Contains(p.Id)))
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
