using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Exceptions;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.V1.Controllers;

public class ExtendedController : ControllerBase
{
    public const string UserHttpContextItem = "App-User";

    protected IDictionary<string, string?> Queries => Request
               .Query
               .ToDictionary(q => q.Key.ToLower(), q => q.Value.First());

    protected IActionResult BadRequest(Exception e)
    {
        return BadRequest(new ApiError(e));
    }

    protected User? CurrentUser => HttpContext.Items[UserHttpContextItem] as User;
}
