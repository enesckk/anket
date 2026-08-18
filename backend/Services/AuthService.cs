using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<AuthResponse> RefreshTokenAsync(string refreshToken);
}

public class AuthService : IAuthService
{
    private readonly SurveyDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(SurveyDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var input = (request.UsernameOrPhone ?? string.Empty).Trim().ToLowerInvariant();
        var phoneDigits = new string(input.Where(char.IsDigit).ToArray());

        var user = await _db.Users.FirstOrDefaultAsync(u =>
            u.Username.ToLower() == input ||
            (u.Email != null && u.Email.ToLower() == input) ||
            u.Phone == input ||
            (input.Contains("saha") && (u.Username == "saha" || u.Role == UserRole.FIELD_USER)) ||
            (input.Contains("admin") && (u.Username == "admin" || u.Role == UserRole.ADMIN)) ||
            (phoneDigits.Length >= 10 && u.Phone.Replace(" ", "").Replace("-", "").Contains(phoneDigits)));

        if (user == null || !user.IsActive || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Geçersiz kullanıcı adı/telefon veya şifre.");
        }

        return await GenerateAuthResponseAsync(user);
    }

    public async Task<AuthResponse> RefreshTokenAsync(string refreshToken)
    {
        var tokenEntity = await _db.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshToken);

        if (tokenEntity == null || !tokenEntity.IsActive || tokenEntity.User == null || !tokenEntity.User.IsActive)
        {
            throw new UnauthorizedAccessException("Geçersiz veya süresi dolmuş yenileme jetonu.");
        }

        tokenEntity.RevokedAt = DateTime.UtcNow;
        return await GenerateAuthResponseAsync(tokenEntity.User);
    }

    private async Task<AuthResponse> GenerateAuthResponseAsync(User user)
    {
        var accessToken = GenerateJwtAccessToken(user);
        var refreshTokenString = GenerateSecureRandomToken();

        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshTokenString,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow
        };

        _db.RefreshTokens.Add(refreshToken);
        await _db.SaveChangesAsync();

        var userDto = new UserDto(user.Id, user.Username, user.Email, user.Phone, user.FullName, user.Role.ToString(), user.IsActive);
        return new AuthResponse(accessToken, refreshTokenString, userDto);
    }

    private string GenerateJwtAccessToken(User user)
    {
        var secretKey = _config["JwtSettings:Secret"] ?? "SuperSecretKeySurveyAdmin2026!ProEnterpriseMasterSecret";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("FullName", user.FullName),
            new Claim("Phone", user.Phone)
        };

        var token = new JwtSecurityToken(
            issuer: _config["JwtSettings:Issuer"] ?? "SurveyAdminApi",
            audience: _config["JwtSettings:Audience"] ?? "SurveyAdminClients",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string GenerateSecureRandomToken()
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }
}
