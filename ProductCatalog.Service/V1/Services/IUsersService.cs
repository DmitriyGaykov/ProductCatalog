using ProductCatalog.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.V1.Services;

public interface IUsersService
{
    Task<IEnumerable<User>> FindAllAsync(IDictionary<string, string?> queries);

    Task<User?> FindByIdAsync(Guid id);
    Task<User> AddAsync(User user);
    Task<User> RemoveAsync(User user);
    Task<User> UpdateAsync(User user);
}
