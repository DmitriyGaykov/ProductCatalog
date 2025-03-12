using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Utils.Pagination;

namespace ProductCatalog.Service.V1.Services;

public class BlocksService : IBlocksService
{
    private readonly ProductCatalogDbContext _context;

    public BlocksService(ProductCatalogDbContext context)
    {
        _context = context;
    }

    public async Task<Block> AddAsync(Block block)
    {
        await _context.Blocks.AddAsync(block);
        await _context.SaveChangesAsync();
        return block;
    }

    public async Task<IEnumerable<Block>> FindAllAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("userid", out var userId);
        queries.TryGetValue("limit", out var s_limit);
        queries.TryGetValue("page", out var s_page);

        var (skip, limit) = SkipLimitExtractor.ExtractSkipAndLimitFrom(s_page, s_limit);

        return await _context
            .Blocks
            .Include(b => b.User)
            .Include(b => b.Administrator)
            .Where(b =>
                (userId == null || b.UserId.Equals(new Guid(userId))) &&
                b.DeletedAt == null
            )
            .OrderByDescending(b => b.CreatedAt)
            .Skip(skip)
            .Take(limit)
            .ToListAsync();
    }

    public Task<Block?> FindByIdAsync(Guid id)
    {
        return _context
            .Blocks
            .Include(b => b.User)
            .Include(b => b.Administrator)
            .FirstOrDefaultAsync(b => b.Id.Equals(id));
    }

    public Task RemoveAsync(IDictionary<string, string?> queries)
    {
        throw new NotImplementedException();
    }

    public async Task<Block> RemoveAsync(Block block)
    {
        block.DeletedAt = DateTime.Now;
        _context.Blocks.Update(block);
        await _context.SaveChangesAsync();
        return block;
    }

    public Task<Block> UpdateAsync(Block entity)
    {
        throw new NotImplementedException();
    }
}
