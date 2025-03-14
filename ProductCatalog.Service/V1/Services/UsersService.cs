using Microsoft.EntityFrameworkCore;
using ProductCatalog.Data;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Utils.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.V1.Services;

public class UsersService : IUsersService
{
    private readonly ProductCatalogDbContext _context;

    public UsersService(ProductCatalogDbContext context)
    {
        _context = context;
    }

    public async Task<User> AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<IEnumerable<User>> FindAllAsync(IDictionary<string, string?> queries)
    {
        queries.TryGetValue("ids", out var ids); // id1|id2|id3
        queries.TryGetValue("q", out var q); // by first and last names
        queries.TryGetValue("role", out var role);
        queries.TryGetValue("email", out var email);
        queries.TryGetValue("password", out var password);
        queries.TryGetValue("page", out var s_page);
        queries.TryGetValue("limit", out var s_limit);
        queries.TryGetValue("blocked", out var blocked);

        var userIds = ids?
            .Split("|")
            ?.Where(id => Guid.TryParse(id, out var userId))
            .Select(Guid.Parse)
            .Distinct()
            .ToList();

        var (skip, limit) = SkipLimitExtractor.ExtractSkipAndLimitFrom(s_page, s_limit);

        var query = _context
            .Users
            .Include(u => u.Blocks.Where(b => b.DeletedAt == null))
            .Where(u =>
                (ids == null || (userIds != null && userIds.Contains(u.Id))) &&
                (
                    q == null ||
                    (u.FirstName + " " + (u.LastName ?? string.Empty)).ToLower().Contains(q) ||
                    ((u.LastName ?? string.Empty) + " " + u.FirstName).ToLower().Contains(q)
                ) &&
                (role == null || u.Role.ToLower().Equals(role)) &&
                (email == null || (u.Email != null && u.Email.Equals(email))) &&
                (password == null || u.PasswordHash.Equals(password)) &&
                (
                    blocked == null || !blocked.Equals("1") ? // Не заблокированые?
                        u.Blocks.Where(b => b.DeletedAt == null).Count() == 0:
                        u.Blocks.Where(b => b.DeletedAt == null).Count() > 0
                ) &&
                u.DeletedAt == null
            )
            .AsQueryable();

        queries[WebApiConfig.CountElementsKey] = (await query.CountAsync()).ToString();

        return await query
            .OrderBy(u => u.FirstName + u.LastName)
            .Skip(skip)
            .Take(limit)
            .ToListAsync();
    }

    public async Task<User?> FindByIdAsync(Guid id)
    {
        return await _context
            .Users
            .FirstOrDefaultAsync(u => u.Id.Equals(id));
    }

    public Task RemoveAsync(IDictionary<string, string?> queries)
    {
        throw new NotImplementedException();
    }

    public async Task<User> RemoveAsync(User user)
    {
        user.DeletedAt = DateTime.Now;
        user.Email = null;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
        user.ModifiedAt = DateTime.Now;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }
}
