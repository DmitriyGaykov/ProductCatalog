using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.V1.Controllers;
using ProductCatalog.Service.V1.Services;

namespace ProductCatalog.Service.Filters;

public class IsProductExistsAttribute : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var productsService = context.HttpContext.RequestServices.GetRequiredService<IProductsService>();
        
        try
        {
            if (!context.HttpContext.Request.RouteValues.TryGetValue("productId", out var o_productId) || o_productId is not string productId)
                throw new Exception(ExceptionsText.ProductIdWasNotProvided);

            var product = await productsService.FindByIdAsync(new Guid(productId));
            if (product is null || product.DeletedAt is not null)
                throw new Exception(ExceptionsText.ProductWasNotFound);

            context.HttpContext.Items[ExtendedController.ProductHttpContextItem] = product;

            await next();
        }
        catch (Exception e)
        {
            context.Result = new BadRequestObjectResult(new ApiError(e));
        }
    }
}
