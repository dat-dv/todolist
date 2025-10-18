
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListApi.Common.Filters;
using TodoListApi.Core.Data;
using TodoListApi.Extensions;
using TodoListApi.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
    options.Filters.Add<CamelCaseValidationFilter>();
})
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.AllowTrailingCommas = true;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
});


builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
});

// Add custom configurations
builder.Services.AddDatabaseConfiguration(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddCorsConfiguration();
builder.Services.AddApplicationServices();
builder.Services.AddSwaggerConfiguration();
var app = builder.Build();
app.AutoMigration();
// Configure pipeline
app.ConfigurePipeline();

app.Run();