using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Api.Validation.Attributes;

namespace ProductCatalog.Service.V1.Dto.Blocks;

public class AddBlockDto
{
    public Guid UserId { get; set; }

    [NotEmptyAndNotNull(MinLength = 2, MaxLength = 300, ErrorMessage = ExceptionsText.BlockReasonIsNotValid)]
    public string Reason { get; set; }
}
