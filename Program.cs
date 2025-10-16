
using TodoListApi.Extensions;
using TodoListApi.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
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

// Configure pipeline
app.ConfigurePipeline();

app.Run();