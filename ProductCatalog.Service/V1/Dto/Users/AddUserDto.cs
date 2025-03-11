using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Api.Validation.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ProductCatalog.Service.V1.Dto.Users;

public class AddUserDto
{
    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 50, ErrorMessage = ExceptionsText.FirstNameLengthBetween1and50)]
    public string FirstName { get; set; }

    [NotEmptyAndNotNull(MinLength = 1, MaxLength = 50, AllowNull = true, ErrorMessage = ExceptionsText.LastNameLengthBetween1and50)]
    public string? LastName { get; set; }

    [Required(ErrorMessage = ExceptionsText.EmailIsRequired)]
    [EmailAddress(ErrorMessage = ExceptionsText.EmailIsNotValid)]
    public string Email { get; set; }

    [NotEmptyAndNotNull(MinLength = 6, MaxLength = 64, ErrorMessage = ExceptionsText.PasswordIsNotValid)]
    public string Password { get; set; }
}
