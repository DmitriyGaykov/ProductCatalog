using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Utils.Pagination;

namespace ProductCatalog.Service.V1.Services;

public class CategoriesService : ICategoriesService
{
    private readonly ProductCatalogDbContext _context;

    public CategoriesService(ProductCatalogDbContext context)
    {
        _context = context;
    }

    public async Task<Category> AddAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<Category> RemoveAsync(Category category)
    {
        category.DeletedAt = DateTime.Now;
        category.Name += " removed " + Guid.NewGuid();
        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<IEnumerable<Category>> FindAllAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("name", out var name);
        //queries.TryGetValue("parentid", out var parentId);
        queries.TryGetValue("limit", out var s_limit);
        queries.TryGetValue("page", out var s_page);

        var (skip, limit) = SkipLimitExtractor.ExtractSkipAndLimitFrom(s_page, s_limit, 100);

        return await _context
            .Categories
            //.Include(c => c.Parent)
            //.Include(c => c.Children)
            .Include(c => c.User)
            .Where(c =>
                (name == null || c.Name.ToLower().Equals(name.Trim().ToLower())) &&
                //(parentId == null || c.ParentId.Equals(new Guid(parentId))) &&
                c.DeletedAt == null
            )
            .OrderBy(c => c.Name)
            .Skip(skip)
            .Take(limit)
            .ToListAsync();
    }

    public Task<Category?> FindByIdAsync(Guid id)
    {
        return _context
            .Categories
            //.Include(c => c.Parent)
            //.Include(c => c.Children)
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id.Equals(id));
    }

    public async Task<Category> UpdateAsync(Category category)
    {
        category.ModifiedAt = DateTime.Now;
        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task RemoveAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("userid", out var userId);

        await _context
            .Categories
            .ExecuteUpdateAsync(setters => 
                setters
                    .SetProperty(c => c.DeletedAt, DateTime.Now)
                    .SetProperty(c => c.Name, c => c.Name + " removed " + Guid.NewGuid())
            );
    }
}
