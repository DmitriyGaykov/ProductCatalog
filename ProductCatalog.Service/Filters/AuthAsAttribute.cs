using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.V1.Services;
using System.Net;
using System.Security.Claims;

namespace ProductCatalog.Service.Filters;

public class AuthAsAttribute : Attribute, IAsyncActionFilter
{
    private readonly IEnumerable<string> _roles;

    public AuthAsAttribute(params string[] roles)
    {
       _roles = roles;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var usersService = context.HttpContext.RequestServices.GetRequiredService<IUsersService>();
        var blocksService = context.HttpContext.RequestServices.GetRequiredService<IBlocksService>();
        var userId = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        try
        {
            if (userId is null)
                throw new Exception(ExceptionsText.TokenIsNotValid);

            var user = await usersService.FindByIdAsync(new Guid(userId));
            if (user is null || user.DeletedAt is not null)
                throw new Exception(ExceptionsText.UserWasNotFound);

            var blocks = await blocksService.FindAllAsync(new Dictionary<string, string?>
            {
                { "userid", user.Id.ToString() }
            });

            var block = blocks.FirstOrDefault();
            if (block is not null)
                throw new Exception(ExceptionsText.UserWasBlocked + block.Reason);

            if (_roles.Count() != 0 && !_roles.Any(r => r.Equals(user.Role)))
                throw new Exception(ExceptionsText.YouHaveNotPermission);

            await next();
        }
        catch (Exception e)
        {
            context.Result = new UnauthorizedObjectResult(new ApiError(e));
        }
    }
}
