namespace ProductCatalog.Service.Services;

public interface IJwtService
{
    (string, DateTime) GenerateJwtToken(string userId);
}
