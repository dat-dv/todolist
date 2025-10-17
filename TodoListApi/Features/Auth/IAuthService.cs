using TodoListApi.Features.Auth.DTOs;

namespace TodoListApi.Features.Auth;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);

    Task<UserInfoDto> GetCurrentUserAsync(int userId);
}