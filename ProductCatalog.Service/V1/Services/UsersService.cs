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

        var userIds = ids?
            .Split("|")
            ?.Where(id => Guid.TryParse(id, out var userId))
            .Select(Guid.Parse)
            .Distinct()
            .ToList();

        var (skip, limit) = SkipLimitExtractor.ExtractSkipAndLimitFrom(s_page, s_limit);

        var users =  await _context
            .Users
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
                u.DeletedAt == null
            )
            .OrderBy(u => u.FirstName + u.LastName)
            .Skip(skip)
            .Take(limit)
            .ToListAsync();

        return users
            .Select(u =>
            {
                u.PasswordHash = string.Empty;
                return u;
            })
            .ToList();
    }

    public async Task<User?> FindByIdAsync(Guid id)
    {
        var user = await _context
            .Users
            .FirstOrDefaultAsync(u => u.Id.Equals(id));

        if (user is not null)
            user.PasswordHash = string.Empty;

        return user;
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
