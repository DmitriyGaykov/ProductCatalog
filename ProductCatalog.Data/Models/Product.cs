using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Data.Models;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    public string? Notes { get; set; } = null;
    public string? SpecialNotes { get; set; } = null;

    [Required]
    public decimal Price { get; set; }

    [ForeignKey("Category")]
    public Guid CategoryId { get; set; }
    [ForeignKey("User")]
    public Guid UserId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; } = null;
    public DateTime? DeletedAt { get; set; } = null;    

    public virtual Category? Category { get; set; }
    public virtual User? User { get; set; } 
}
