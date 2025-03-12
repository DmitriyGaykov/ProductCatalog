namespace ProductCatalog.Service.V1.Services;

public interface IGrudService<T> 
    where T : class
{
    Task<IEnumerable<T>> FindAllAsync(IDictionary<string, string?> queries);
    Task RemoveAsync(IDictionary<string, string?> queries);

    Task<T?> FindByIdAsync(Guid id);
    Task<T> AddAsync(T entity);
    Task<T> RemoveAsync(T entity);
    Task<T> UpdateAsync(T entity);
}
