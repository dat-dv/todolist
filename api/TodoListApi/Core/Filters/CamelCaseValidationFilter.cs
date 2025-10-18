using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TodoListApi.Common.Filters;

public class CamelCaseValidationFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = new Dictionary<string, string[]>();

            foreach (var kvp in context.ModelState.Where(e => e.Value?.Errors.Count > 0))
            {
                // Convert first character to lowercase (PascalCase -> camelCase)
                var key = char.ToLowerInvariant(kvp.Key[0]) + kvp.Key.Substring(1);
                var errorMessages = kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray() ?? Array.Empty<string>();
                errors[key] = errorMessages;
            }

            var result = new
            {
                type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
                title = "One or more validation errors occurred.",
                status = 400,
                errors = errors,
                traceId = context.HttpContext.TraceIdentifier
            };

            context.Result = new BadRequestObjectResult(result)
            {
                ContentTypes = { "application/problem+json" }
            };
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}