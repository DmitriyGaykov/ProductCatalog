using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Service.Api.Exceptions;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Service.Api.Controllers;

public class ExtendedController : ControllerBase
{
    protected IDictionary<string, string?> Queries => Request
               .Query
               .ToDictionary(q => q.Key.ToLower(), q => q.Value.First());

    protected IActionResult BadRequest(Exception e)
    {
        return BadRequest(new ApiError(e));
    }
}
