using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.V1.Controllers;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Filters;
using ProductCatalog.Service.V1.Dto.Categories;
using ProductCatalog.Service.V1.Services;

namespace ProductCatalog.Service.V1.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[ApiVersion("1.0")]
[Authorize]
public class CategoriesController : ExtendedController
{
    private readonly ICategoriesService _categoriesService;
    private readonly IProductsService _productsService;

    public CategoriesController(ICategoriesService categoriesService, IProductsService productsService)
    {
        _categoriesService = categoriesService;
        _productsService = productsService;
    }

    [HttpGet]
    [AuthAs]
    public async Task<IActionResult> FindAllAsync()
    {
        try
        {
            var categories = await _categoriesService.FindAllAsync(Queries);
            return Ok(categories);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPost]
    [AuthAs(Roles.AdvancedUser)]
    public async Task<IActionResult> AddAsync(AddCategoryDto dto)
    {
        try
        {
            var categories = await _categoriesService.FindAllAsync(new Dictionary<string, string?>
            {
                { "name", dto.Name },
            });

            if (categories.Count() > 0)
                throw new Exception(ExceptionsText.CategoryNameWasReserved);

            Category? parent = null;

            if (dto.ParentId is not null)
            {
                parent = await _categoriesService.FindByIdAsync(dto.ParentId.Value);
                if (parent is null)
                    throw new Exception(ExceptionsText.CategoryWasNotFound + $" ({dto.ParentId.Value})");
            }

            var category = new Category()
            {
                Name = dto.Name.Trim(),
                ParentId = dto.ParentId,
                UserId = CurrentUser!.Id
            };

            category = await _categoriesService.AddAsync(category);
            category.Parent = parent;

            return Ok(category);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{categoryId:guid}")]
    [AuthAs(Roles.AdvancedUser)]
    public async Task<IActionResult> RemoveAsync(Guid categoryId)
    {
        try
        {
            var category = await _categoriesService.FindByIdAsync(categoryId);
            if (category is null)
                throw new Exception(ExceptionsText.CategoryWasNotFound);

            if (!CurrentUser!.Id.Equals(category.UserId))
                throw new Exception(ExceptionsText.CategoryIsNotYours);

            category = await _categoriesService.RemoveAsync(category);

            await _productsService.RemoveAsync(new Dictionary<string, string?>
            {
                { "categoryid", category.Id.ToString() }
            });

            return Ok(category);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPatch("{categoryId:guid}")]
    [AuthAs(Roles.AdvancedUser)]
    public async Task<IActionResult> UpdateAsync(Guid categoryId, UpdateCategoryDto dto)
    {
        try
        {
            var category = await _categoriesService.FindByIdAsync(categoryId);
            if (category is null)
                throw new Exception(ExceptionsText.CategoryWasNotFound);

            if (!CurrentUser!.Id.Equals(category.UserId))
                throw new Exception(ExceptionsText.CategoryIsNotYours);

            if (dto.Name is not null)
                category.Name = dto.Name.Trim(); 

            if (dto.ParentId is not null && !dto.ParentId.Value.Equals(category.ParentId))
            {
                var parent = await _categoriesService.FindByIdAsync(dto.ParentId.Value);
                if (parent is null)
                    throw new Exception(ExceptionsText.CategoryWasNotFound + $" ({dto.ParentId.Value})");

                category.ParentId = parent.Id;
                category.Parent = parent;
            }

            category = await _categoriesService.UpdateAsync(category);

            return Ok(category);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
