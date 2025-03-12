using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Data.Models;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [ForeignKey("Parent")]
    public Guid? ParentId { get; set; } = null;
    [ForeignKey("User")]
    public Guid UserId { get; set; }

    [Required]
    public string Name { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? ModifiedAt { get; set; } = null;
    public DateTime? DeletedAt { get; set; } = null;

    public virtual User? User { get; set; }
    public virtual Category? Parent { get; set; }
    public virtual ICollection<Category> Children { get; set; } = new List<Category>();
}
