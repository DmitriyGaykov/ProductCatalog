using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Api.Validation.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Service.V1.Dto.Categories;

public class AddCategoryDto
{
    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 50, ErrorMessage = ExceptionsText.CategoryNameSizeIsNotValid)]
    [RegularExpression("^[a-zA-Zа-яА-Я]+$", ErrorMessage = ExceptionsText.CategoryNameIsNotValid)]
    public string Name { get; set; }

    //public Guid? ParentId { get; set; } = null;
}
