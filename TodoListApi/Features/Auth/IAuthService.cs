using TodoListApi.Features.Auth.DTOs;

namespace TodoListApi.Features.Auth;

public interface IAuthService
{
    Task<string> RegisterAsync(RegisterDto registerDto);
    Task<string> LoginAsync(LoginDto loginDto);
}