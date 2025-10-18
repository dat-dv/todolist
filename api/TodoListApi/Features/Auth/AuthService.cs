using Microsoft.EntityFrameworkCore;
using TodoListApi.Core.Data;
using TodoListApi.Core.Models;
using TodoListApi.Features.Auth.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TodoListApi.Features.Auth;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<UserInfoDto> GetCurrentUserAsync(int userId)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            throw new UnauthorizedAccessException("User not found");
        }

        return new UserInfoDto
        {
            Id = user.Id,
            Username = user.Username,
            CreatedAt = user.CreatedAt
        };
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
        {
            throw new ArgumentException("Username already exists");
        }

        var user = new User
        {
            Username = registerDto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var expiresAt = DateTime.UtcNow.AddHours(3);
        var token = GenerateJwtToken(user, expiresAt);

        return new AuthResponseDto
        {
            Token = token,
            ExpiresAt = expiresAt,
            User = new UserInfoDto
            {
                Id = user.Id,
                Username = user.Username,
                CreatedAt = user.CreatedAt
            }
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid credentials");
        }

        var expirationHoursStr = Environment.GetEnvironmentVariable("JWT_EXPIRATION_HOURS");
        if (expirationHoursStr == null)
        {
            throw new InvalidOperationException("JWT_EXPIRATION_HOURS is not configured");
        }

        var expirationHours = int.Parse(expirationHoursStr);

        var expiresAt = DateTime.UtcNow.AddHours(expirationHours);

        var token = GenerateJwtToken(user, expiresAt);

        return new AuthResponseDto
        {
            Token = token,
            ExpiresAt = expiresAt,
            User = new UserInfoDto
            {
                Id = user.Id,
                Username = user.Username,
                CreatedAt = user.CreatedAt
            }
        };
    }

    private string GenerateJwtToken(User user, DateTime expiresAt)
    {
        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

        // Debug logs
        Console.WriteLine($"JWT_KEY: {jwtKey}");
        Console.WriteLine($"JWT_ISSUER: {jwtIssuer}");
        Console.WriteLine($"JWT_AUDIENCE: {jwtAudience}");

        if (string.IsNullOrEmpty(jwtKey))
        {
            throw new InvalidOperationException("JWT_KEY is not configured");
        }

        if (string.IsNullOrEmpty(jwtIssuer))
        {
            throw new InvalidOperationException("JWT_ISSUER is not configured");
        }

        if (string.IsNullOrEmpty(jwtAudience))
        {
            throw new InvalidOperationException("JWT_AUDIENCE is not configured");
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
        new Claim("UserId", user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}