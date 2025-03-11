using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Service.Api.Controllers;
using ProductCatalog.Service.Api.Crypto;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Services;
using ProductCatalog.Service.V1.Dto.Auth;
using ProductCatalog.Service.V1.Services;

namespace ProductCatalog.Service.V1.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[ApiVersion("1.0")]
public class AuthController : ExtendedController
{
    private readonly IJwtService _jwtService;
    private readonly IUsersService _usersService;

    public AuthController(IJwtService jwtService, IUsersService usersService)
    {
        _jwtService = jwtService;
        _usersService = usersService;
    }

    [HttpPost]
    public async Task<IActionResult> SignInAsync(SignInDto dto)
    {
        try
        {
            var pwdHash = ShaHasher.Sha256(dto.Password);

            var users = await _usersService.FindAllAsync(new Dictionary<string, string?>
            {
                { "email", dto.Email },
                { "password", pwdHash }
            });

            if (users.Count() == 0)
                throw new Exception(ExceptionsText.EmailOrPasswordAreNotValid);

            var user = users.First();
            var (token, expires) = _jwtService.GenerateJwtToken(user.Id.ToString());

            return Ok(new
            {
                accessToken = token,
                expires
            });
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
