using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Data.Models;

public class Block
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [ForeignKey("User")]
    public Guid UserId { get; set; }
    [ForeignKey("Administrator")]
    public Guid AdministratorId { get; set; }

    [Required]
    public string Reason { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? DeletedAt { get; set; } = null;

    public virtual User? User { get; set; } 
    public virtual User? Administrator { get; set; }
}
