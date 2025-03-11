using ProductCatalog.Data.Models;

namespace ProductCatalog.Service.V1.Services;

public interface IBlocksService
{
    Task<IEnumerable<Block>> FindAllAsync(IDictionary<string, string?> queries);

    Task<Block?> FindByIdAsync(Guid id);
    Task<Block> RemoveAsync(Block block);
    Task<Block> AddAsync(Block block);
}
