using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.V1.Controllers;
using ProductCatalog.Service.Api.Crypto;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Filters;
using ProductCatalog.Service.V1.Dto.Users;
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
    public async Task<IActionResult> AddAsync(AddUserDto dto)
    {
        try
        {
            var users = await _usersService.FindAllAsync(new Dictionary<string, string?>
            {
                { "email", dto.Email }
            });

            if (users.Count() > 0)
                throw new Exception(ExceptionsText.EmailWasRecerved);

            var user = new User()
            {
                FirstName = dto.FirstName.Trim(),
                LastName = dto.LastName?.Trim(),
                Email = dto.Email,
                PasswordHash = ShaHasher.Sha256(dto.Password)
            };

            user = await _usersService.AddAsync(user);
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPatch("{userId:guid}")]
    [AuthAs(Roles.Admin)]
    public async Task<IActionResult> UpdateAsync(Guid userId, UpdateUserDto dto)
    {
        try
        {
            var user = await _usersService.FindByIdAsync(userId);
            if (user is null || user.DeletedAt is not null)
                throw new Exception(ExceptionsText.UserWasNotFound);

            user.PasswordHash = ShaHasher.Sha256(dto.Password);
            user = await _usersService.UpdateAsync(user);
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{userId:guid}")]
    [AuthAs(Roles.Admin)]
    public async Task<IActionResult> RemoveAsync(Guid userId)
    {
        try
        {
            var user = await _usersService.FindByIdAsync(userId);
            if (user is null || user.DeletedAt is not null)
                throw new Exception(ExceptionsText.UserWasNotFound);

            user = await _usersService.RemoveAsync(user);
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
