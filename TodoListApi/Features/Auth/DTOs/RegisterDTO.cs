using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Filters;

namespace TodoListApi.Features.Auth.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "Username is required")]
    [StringLength(24, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 24 characters")]
    [RegularExpression(@"^[a-zA-Z0-9_]+$", ErrorMessage = "Username can only contain letters, numbers, and underscores")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    [StringLength(32, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 32 characters")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")]
    public string Password { get; set; } = string.Empty;
}

public class RegisterExample : BaseAuthExample, IExamplesProvider<RegisterDto>
{
    public RegisterDto GetExamples()
    {
        return new RegisterDto
        {
            Username = GetExampleUsername(),
            Password = GetExamplePassword()
        };
    }
}