using System.Collections.Concurrent;
using System.Net;

namespace SurveyAdmin.Api.Middlewares;

public class SecurityAndRateLimitMiddleware
{
    private readonly RequestDelegate _next;
    private static readonly ConcurrentDictionary<string, List<DateTime>> LoginRequests = new();
    private const int MaxLoginRequestsPerMinute = 10;

    public SecurityAndRateLimitMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Add Security Headers
        context.Response.Headers.Append("X-Frame-Options", "DENY");
        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
        context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
        context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

        // 2. Rate Limiting for Auth Login
        if (context.Request.Path.Equals("/api/auth/login", StringComparison.OrdinalIgnoreCase) &&
            context.Request.Method.Equals("POST", StringComparison.OrdinalIgnoreCase))
        {
            var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var now = DateTime.UtcNow;

            var timestamps = LoginRequests.GetOrAdd(clientIp, _ => new List<DateTime>());

            lock (timestamps)
            {
                // Remove requests older than 1 minute
                timestamps.RemoveAll(t => (now - t).TotalMinutes > 1);

                if (timestamps.Count >= MaxLoginRequestsPerMinute)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
                    context.Response.ContentType = "application/json";
                    context.Response.WriteAsync("{\"message\": \"Çok fazla hatalı giriş denemesi. Lütfen 1 dakika bekleyiniz.\"}");
                    return;
                }

                timestamps.Add(now);
            }
        }

        await _next(context);
    }
}

public static class SecurityMiddlewareExtensions
{
    public static IApplicationBuilder UseSecurityAndRateLimiting(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<SecurityAndRateLimitMiddleware>();
    }
}
