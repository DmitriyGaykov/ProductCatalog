using ProductCatalog.Data.Models;

namespace ProductCatalog.Service.V1.Services;

public class CategoriesService : ICategoriesService
{
    public Task<Category> AddAsync(Category category)
    {
        throw new NotImplementedException();
    }

    public Task<Category> RemoveAsync(Category category)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Category>> FindAllAsync(IDictionary<string, string?> queries)
    {
        throw new NotImplementedException();
    }

    public Task<Category?> FindByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Category> UpdateAsync(Category category)
    {
        throw new NotImplementedException();
    }
}
