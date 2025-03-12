﻿using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Controllers;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Filters;
using ProductCatalog.Service.V1.Dto.Blocks;
using ProductCatalog.Service.V1.Services;

namespace ProductCatalog.Service.V1.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[ApiVersion("1.0")]
[Authorize]
[AuthAs(Roles.Admin)]
public class BlocksController : ExtendedController
{
    private readonly IBlocksService _blocksService;
    private readonly IUsersService _usersService;

    public BlocksController(IBlocksService blocksService, IUsersService usersService)
    {
        _blocksService = blocksService;
        _usersService = usersService;
    }

    [HttpGet]
    public async Task<IActionResult> FindAllAsync()
    {
        try
        {
            var blocks = await _blocksService.FindAllAsync(Queries);
            return Ok(blocks);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddAsync(AddBlockDto dto)
    {
        try
        {
            var admin = CurrentUser!;

            if (admin.Id.Equals(dto.UserId))
                throw new Exception(ExceptionsText.AdminCannotBlockYourself);

            var user = await _usersService.FindByIdAsync(dto.UserId);
            if (user is null)
                throw new Exception(ExceptionsText.UserWasNotFound);

            var blocks = await _blocksService.FindAllAsync(new Dictionary<string, string?>
            {
                { "userid", user.Id.ToString() }
            });

            if (blocks.Count() > 0)
                throw new Exception(ExceptionsText.UserHasBeenAlreadyBlocked);

            var block = new Block()
            {
                UserId = dto.UserId,
                Reason = dto.Reason,
                AdministratorId = admin.Id,
            };

            block = await _blocksService.AddAsync(block);

            block.User = user;
            block.Administrator = admin;

            return Ok(block);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{blockId:guid}")]
    public async Task<IActionResult> RemoveAsync(Guid blockId)
    {
        try
        {
            var block = await _blocksService.FindByIdAsync(blockId);
            if (block is null || block.DeletedAt is not null)
                throw new Exception(ExceptionsText.BlockWasNotFound);

            block = await _blocksService.RemoveAsync(block);

            return Ok(block);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
