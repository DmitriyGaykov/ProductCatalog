using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

public class RemovePasswordHashMiddleware
{
    private readonly RequestDelegate _next;

    public RemovePasswordHashMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // Перехватываем поток ответа
        var originalBodyStream = context.Response.Body;
        using var memoryStream = new MemoryStream();
        context.Response.Body = memoryStream;

        // Выполняем следующий Middleware
        await _next(context);

        // Проверяем, является ли ответ JSON
        if (context.Response.ContentType?.Contains("application/json") == true)
        {
            memoryStream.Seek(0, SeekOrigin.Begin);
            using var reader = new StreamReader(memoryStream, Encoding.UTF8);
            var responseBody = await reader.ReadToEndAsync();

            // Парсим JSON и удаляем поле "passwordHash"
            var jsonDocument = JsonDocument.Parse(responseBody);
            var modifiedJson = RemovePasswordHash(jsonDocument);

            // Записываем измененный JSON обратно в поток
            var modifiedBytes = Encoding.UTF8.GetBytes(modifiedJson);
            context.Response.Body = originalBodyStream;
            context.Response.ContentLength = modifiedBytes.Length;
            await context.Response.Body.WriteAsync(modifiedBytes, 0, modifiedBytes.Length);
        }
        else
        {
            // Если ответ не JSON, просто передаем его дальше
            memoryStream.Seek(0, SeekOrigin.Begin);
            await memoryStream.CopyToAsync(originalBodyStream);
        }
    }

    private string RemovePasswordHash(JsonDocument jsonDocument)
    {
        using var memoryStream = new MemoryStream();
        using var writer = new Utf8JsonWriter(memoryStream);

        RewriteJsonWithoutPasswordHash(jsonDocument.RootElement, writer);
        writer.Flush();

        return Encoding.UTF8.GetString(memoryStream.ToArray());
    }

    private void RewriteJsonWithoutPasswordHash(JsonElement element, Utf8JsonWriter writer)
    {
        if (element.ValueKind == JsonValueKind.Object)
        {
            writer.WriteStartObject();
            foreach (var property in element.EnumerateObject())
            {
                if (property.Name != "passwordHash")
                {
                    writer.WritePropertyName(property.Name);
                    RewriteJsonWithoutPasswordHash(property.Value, writer);
                }
            }
            writer.WriteEndObject();
        }
        else if (element.ValueKind == JsonValueKind.Array)
        {
            writer.WriteStartArray();
            foreach (var item in element.EnumerateArray())
            {
                RewriteJsonWithoutPasswordHash(item, writer);
            }
            writer.WriteEndArray();
        }
        else
        {
            element.WriteTo(writer);
        }
    }
}
