using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Api.Validation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.V1.Dto.Auth;

public class SignInDto
{
    [NotEmptyAndNotNull(MinLength = 2, ErrorMessage = ExceptionsText.FieldEmailsShouldNotBeEmpty)]
    public string Email { get; set; }

    [NotEmptyAndNotNull(MinLength = 6, ErrorMessage = ExceptionsText.FieldPasswordShouldNotBeEmpty)]
    public string Password { get; set; }
}
