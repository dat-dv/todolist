
using System.Text.Json;
using TodoListApi.Common.Filters;
using TodoListApi.Extensions;
using TodoListApi.Filters;
using Microsoft.AspNetCore.HttpOverrides;

// Load .env file
DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor |
        ForwardedHeaders.XForwardedProto |
        ForwardedHeaders.XForwardedHost;

    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});
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
builder.Services.AddDatabaseConfiguration();
builder.Services.AddJwtAuthentication();
builder.Services.AddCorsConfiguration();
builder.Services.AddApplicationServices();
builder.Services.AddSwaggerConfiguration();
var app = builder.Build();
app.AutoMigration();
// Configure pipeline
app.ConfigurePipeline();


app.Run();