using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ProductCatalog.Service.Api.Validation.Attributes;
using ProductCatalog.Service.Api.Exceptions;

namespace ProductCatalog.Service.V1.Dto.Products;

public class AddProductDto
{
    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 100, ErrorMessage = ExceptionsText.ProductNameIsNotValid)]
    public string Name { get; set; }

    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 300, ErrorMessage = ExceptionsText.ProductDescriptionIsNotValid)]
    public string Description { get; set; }

    [NotEmptyAndNotNull(MaxLength = 300, AllowNull = true, ErrorMessage = ExceptionsText.ProductNotesIsNotValid)]
    public string? Notes { get; set; } = null;

    [NotEmptyAndNotNull(MaxLength = 300, AllowNull = true, ErrorMessage = ExceptionsText.ProductSpecialNotesIsNotValid)]
    public string? SpecialNotes { get; set; } = null;

    [Range(0.10, 10000.0, ErrorMessage = ExceptionsText.ProductPriceIsNotValid)]
    public decimal Price { get; set; }

    [Required(ErrorMessage = ExceptionsText.ProductCategoryIsRequired)] 
    public Guid CategoryId { get; set; }
}
