using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Crypto;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Filters;
using ProductCatalog.Service.V1.Dto.Users;
using ProductCatalog.Service.V1.Services;

namespace ProductCatalog.Service.V1.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[ApiVersion("1.0")]
[Authorize]
public class UsersController : ExtendedController
{
    private readonly IUsersService _usersService;
    private readonly IProductsService _productsService;
    private readonly ICategoriesService _categoriesService;

    public UsersController(IUsersService usersService, IProductsService productsService, ICategoriesService categoriesService)
    {
        _usersService = usersService;
        _productsService = productsService;
        _categoriesService = categoriesService;
    }

    [HttpGet]
    [AuthAs]
    public async Task<IActionResult> FindAllAsync()
    {
        try
        {
            var queries = Queries;
            queries.Remove("password");

            if (!CurrentUser!.Role.Equals(Roles.Admin))
                queries.Remove("blocked");

            var users = await _usersService.FindAllAsync(queries);
            Response.Headers.Append(WebApiConfig.CountElementsKey, queries[WebApiConfig.CountElementsKey]);

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

            if (dto.Password is not null)
                user.PasswordHash = ShaHasher.Sha256(dto.Password);

            if (dto.Role is Roles.User or Roles.AdvancedUser or Roles.Admin)
                user.Role = dto.Role;

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

            var query = new Dictionary<string, string?>
            {
                { "userid", user.Id.ToString() }
            };

            await _productsService
                .RemoveAsync(query);

            await _categoriesService
                .RemoveAsync(query);

            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
