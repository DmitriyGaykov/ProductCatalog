using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Data.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string FirstName { get; set; }
    public string? LastName { get; set; }

    public string Role { get; set; } = Roles.User;

    [Required]
    public string PasswordHash { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? DeletedAt { get; set; } = null;
    public DateTime? ModifiedAt { get; set; } = null;

    public virtual IEnumerable<Block> Blocks { get; set; } = new List<Block>();
}
