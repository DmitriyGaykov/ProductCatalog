using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductCatalog.Data.Models;
using ProductCatalog.Service.Api.Exceptions;
using ProductCatalog.Service.Filters;
using ProductCatalog.Service.V1.Controllers;
using ProductCatalog.Service.V1.Dto.Products;
using ProductCatalog.Service.V1.Services;

namespace ProductCatalog.Service.V1.Controllers;

[Route("api/v1/[controller]")]
[ApiVersion("1.0")]
[ApiController]
[Authorize]
public class ProductsController : ExtendedController
{
    private readonly IProductsService _productsService;
    private readonly ICategoriesService _categoriesService;

    public ProductsController(IProductsService productsService, ICategoriesService categoriesService)
    {
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
            var products = await _productsService.FindAllAsync(queries);

            Response.Headers.Append(WebApiConfig.CountElementsKey, queries[WebApiConfig.CountElementsKey]);

            return Ok(products);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpGet("{productId:guid}")]
    [AuthAs]
    [IsProductExists]
    public async Task<IActionResult> FindByIdAsync()
    {
        try
        {
            return Ok(Product);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPost]
    [AuthAs(Roles.AdvancedUser, Roles.User)]
    public async Task<IActionResult> AddAsync(AddProductDto dto)
    {
        try
        {
            var category = await _categoriesService.FindByIdAsync(dto.CategoryId);
            if (category is null)
                throw new Exception(ExceptionsText.CategoryWasNotFound);

            var product = new Product
            {
                Name = dto.Name.Trim(),
                Price = dto.Price,
                Description = dto.Description.Trim(),
                Notes = dto.Notes?.Trim(),
                SpecialNotes = dto.SpecialNotes?.Trim(),
                CategoryId = dto.CategoryId,
                UserId = CurrentUser!.Id
            };

            product = await _productsService.AddAsync(product);
            product.User = CurrentUser;

            return Ok(product);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete]
    [AuthAs(Roles.AdvancedUser)]
    public async Task<IActionResult> RemoveAllAsync()
    {
        try
        {
            var queries = Queries;
            queries["advanceduserid"] = CurrentUser!.Id.ToString();

            await _productsService.RemoveAsync(queries);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpDelete("{productId:guid}")]
    [AuthAs(Roles.AdvancedUser)]
    [IsProductExists]
    public async Task<IActionResult> RemoveAsync()
    {
        try
        {
            if (
                Product!.User!.Role.Equals(Roles.AdvancedUser) && // Продвинутый пользователь не может удалить продукт другого продвинутого пользователя
                !Product!.User!.Id.Equals(CurrentUser!.Id)
                )
                throw new Exception(ExceptionsText.AdvancedUserCannotRemoveProductOfAnotherAdvancedUser);

            var product = await _productsService.RemoveAsync(Product);
            return Ok(product);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }

    [HttpPatch("{productId:guid}")]
    [AuthAs(Roles.AdvancedUser, Roles.User)]
    [IsProductExists]
    public async Task<IActionResult> UpdateAsync(UpdateProductDto dto)
    {
        try
        {
            Product product = Product!;

            if (!product.UserId.Equals(CurrentUser!.Id))
                throw new Exception(ExceptionsText.ProductIsNotYours);

            if (dto.Name is not null)
                product.Name = dto.Name.Trim();

            if (dto.Description is not null)
                product.Description = dto.Description.Trim();

            if (dto.Price is not null)
                product.Price = dto.Price.Value;

            if (dto.Notes is not null)
                product.Notes = dto.Notes.Trim();

            if (dto.SpecialNotes is not null)
                product.SpecialNotes = dto.SpecialNotes.Trim();

            if (dto.CategoryId is not null && !dto.CategoryId.Value.Equals(product.CategoryId))
            {
                var category = await _categoriesService.FindByIdAsync(dto.CategoryId.Value);
                if (category is null)
                    throw new Exception(ExceptionsText.CategoryWasNotFound + $" ({dto.CategoryId.Value})");

                product.CategoryId = category.Id;
            }

            product = await _productsService.UpdateAsync(product);

            return Ok(product);
        }
        catch (Exception e)
        {
            return BadRequest(e);
        }
    }
}
