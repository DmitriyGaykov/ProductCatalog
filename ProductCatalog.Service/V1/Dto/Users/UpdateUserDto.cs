using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Api.Validation.Attributes;

namespace ProductCatalog.Service.V1.Dto.Users;

public class UpdateUserDto
{
    [NotEmptyAndNotNull(MinLength = 6, MaxLength = 64, ErrorMessage = ExceptionsText.PasswordIsNotValid)]
    public string Password { get; set; }
}
