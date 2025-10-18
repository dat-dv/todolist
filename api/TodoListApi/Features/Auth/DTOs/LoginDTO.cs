using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Filters;

namespace TodoListApi.Features.Auth.DTOs;

public abstract class BaseAuthExample
{
    protected virtual string GetExampleUsername() => "john_doe";
    protected virtual string GetExamplePassword() => "SecurePass123!";
}

public class LoginDto
{
    [Required(ErrorMessage = "Username is required")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
}

public class LoginExample : BaseAuthExample, IExamplesProvider<LoginDto>
{
    public LoginDto GetExamples()
    {
        return new LoginDto
        {
            Username = GetExampleUsername(),
            Password = GetExamplePassword()
        };
    }
}