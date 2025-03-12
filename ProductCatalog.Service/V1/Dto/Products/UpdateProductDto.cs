using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Api.Validation.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Service.V1.Dto.Products;

public class UpdateProductDto
{
    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 100, AllowNull = true, ErrorMessage = ExceptionsText.ProductNameIsNotValid)]
    public string? Name { get; set; } = null;

    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 300, AllowNull = true, ErrorMessage = ExceptionsText.ProductDescriptionIsNotValid)]
    public string? Description { get; set; } = null;

    [NotEmptyAndNotNull(MaxLength = 300, AllowNull = true, ErrorMessage = ExceptionsText.ProductNotesIsNotValid)]
    public string? Notes { get; set; } = null;

    [NotEmptyAndNotNull(MaxLength = 300, AllowNull = true, ErrorMessage = ExceptionsText.ProductSpecialNotesIsNotValid)]
    public string? SpecialNotes { get; set; } = null;

    [Range(0.10, 10000.0, ErrorMessage = ExceptionsText.ProductPriceIsNotValid)]
    public decimal? Price { get; set; } = null;

    public Guid? CategoryId { get; set; } = null;
}
