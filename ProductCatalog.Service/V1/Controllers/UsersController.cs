using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Controllers;
using ProductCatalog.Service.Filters;
using ProductCatalog.Service.V1.Services;
using System.Security.Claims;

namespace ProductCatalog.Service.V1.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[ApiVersion("1.0")]
[Authorize]
public class UsersController : ExtendedController
{
    private readonly IUsersService _usersService;

    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpGet]
    [AuthAs]
    public async Task<IActionResult> FindAllAsync()
    {
        try
        {
            var queries = Queries;
            queries.Remove("password");

            var users = await _usersService.FindAllAsync(queries);
            return Ok(users);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPost]
    [AuthAs(Roles.Admin)]
    public async Task<IActionResult> AddUserAsync()
    {
        try
        {
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
