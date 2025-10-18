using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using System.Text.Json;

namespace TodoListApi.Filters
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception, "Unhandled exception occurred");

            var statusCode = context.Exception switch
            {
                UnauthorizedAccessException => (int)HttpStatusCode.Unauthorized,
                KeyNotFoundException => (int)HttpStatusCode.NotFound,
                ArgumentException => (int)HttpStatusCode.BadRequest,
                _ => (int)HttpStatusCode.InternalServerError
            };

            var errorTitle = GetErrorTitle(context.Exception);
            var errorMessage = GetErrorMessage(context.Exception, errorTitle);

            var response = new
            {
                title = errorTitle,
                message = errorMessage,
                statusCode = statusCode,
                stackTrace = _env.IsDevelopment() ? context.Exception.StackTrace : null
            };

            context.Result = new ObjectResult(response)
            {
                StatusCode = statusCode
            };

            context.ExceptionHandled = true;
        }

        private string GetErrorTitle(Exception exception)
        {
            return exception switch
            {
                UnauthorizedAccessException => "Unauthorized",
                KeyNotFoundException => "Not Found",
                ArgumentException => "Bad Request",
                _ => "Internal Server Error"
            };
        }

        private string GetErrorMessage(Exception exception, string fallbackTitle)
        {
            // Ưu tiên: exception.Message -> fallbackTitle -> "Something went wrong"
            if (!string.IsNullOrWhiteSpace(exception.Message))
            {
                return exception.Message;
            }

            if (!string.IsNullOrWhiteSpace(fallbackTitle))
            {
                return fallbackTitle;
            }

            return "Something went wrong";
        }
    }
}