namespace ProductCatalog.Service.Api;

public class EnvironmentConfig
{
    public const string ProductCatalogConnectionString = "PRODUCT_CATALOG_CONNECTION_STRING";
    public const string DefaultAdminEmail = "DEFAULT_ADMIN_EMAIL";
    public const string DefaultAdminPassword = "DEFAULT_ADMIN_PASSWORD";

    public static string? GetProductCatalogConnectionString() => Environment.GetEnvironmentVariable(ProductCatalogConnectionString);
    public static string? GetDefaultAdminEmail() => Environment.GetEnvironmentVariable(DefaultAdminEmail);
    public static string? GetDefaultAdminPassword() => Environment.GetEnvironmentVariable(DefaultAdminPassword);
}
