using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Middlewares;
using SurveyAdmin.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add Services to Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger with JWT Support
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SurveyAdmin API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Access Token giriniz: Bearer {token}"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

// DbContext setup. Production must never silently fall back to an in-memory
// database because every deploy/restart would erase operational data.
var connString = builder.Configuration.GetConnectionString("DefaultConnection");
var useSqlServer = builder.Configuration.GetValue<bool>("UseSqlServer");
var databaseProvider = builder.Configuration["DatabaseProvider"]?.Trim().ToLowerInvariant();

if (databaseProvider == "postgres")
{
    var databaseUrl = builder.Configuration["DatabaseUrl"];
    var host = builder.Configuration["Database:Host"];
    var database = builder.Configuration["Database:Name"];
    var username = builder.Configuration["Database:User"];
    var password = builder.Configuration["Database:Password"];
    var portValue = builder.Configuration["Database:Port"];

    Npgsql.NpgsqlConnectionStringBuilder pgConnectionBuilder;
    if (!string.IsNullOrWhiteSpace(databaseUrl))
    {
        if (databaseUrl.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase) ||
            databaseUrl.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
        {
            var uri = new Uri(databaseUrl);
            var userInfo = uri.UserInfo.Split(':', 2);
            if (userInfo.Length != 2 || string.IsNullOrWhiteSpace(uri.Host) || string.IsNullOrWhiteSpace(uri.AbsolutePath))
                throw new InvalidOperationException("DatabaseUrl is not a valid PostgreSQL URL.");

            var query = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(uri.Query);
            var sslMode = query.TryGetValue("sslmode", out var sslModeValue) &&
                          string.Equals(sslModeValue.ToString(), "disable", StringComparison.OrdinalIgnoreCase)
                ? Npgsql.SslMode.Disable
                : Npgsql.SslMode.VerifyFull;

            pgConnectionBuilder = new Npgsql.NpgsqlConnectionStringBuilder
            {
                Host = uri.Host,
                Port = uri.IsDefaultPort ? 5432 : uri.Port,
                Database = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/')),
                Username = Uri.UnescapeDataString(userInfo[0]),
                Password = Uri.UnescapeDataString(userInfo[1]),
                SslMode = sslMode,
                Pooling = true
            };
        }
        else
        {
            pgConnectionBuilder = new Npgsql.NpgsqlConnectionStringBuilder(databaseUrl);
        }
    }
    else
    {
        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(database) ||
            string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            throw new InvalidOperationException(
                "PostgreSQL configuration is incomplete. Set DatabaseUrl or database host, name, user and password.");
        }

        pgConnectionBuilder = new Npgsql.NpgsqlConnectionStringBuilder
        {
            Host = host,
            Port = int.TryParse(portValue, out var pgPort) ? pgPort : 5432,
            Database = database,
            Username = username,
            Password = password,
            SslMode = Npgsql.SslMode.Prefer,
            Pooling = true
        };
    }

    builder.Services.AddDbContext<SurveyDbContext>(options =>
        options.UseNpgsql(pgConnectionBuilder.ConnectionString, postgresOptions =>
            postgresOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));
}
else if (useSqlServer && !string.IsNullOrWhiteSpace(connString))
{
    builder.Services.AddDbContext<SurveyDbContext>(options =>
        options.UseSqlServer(connString, sqlOptions =>
            sqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));
}
else if (builder.Environment.IsProduction())
{
    throw new InvalidOperationException(
        "A persistent database is required in production. Configure DatabaseProvider=Postgres or UseSqlServer=true.");
}
else
{
    builder.Services.AddDbContext<SurveyDbContext>(options =>
        options.UseInMemoryDatabase("SurveyAdminDb"));
}

// Register Application Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISurveyService, SurveyService>();
builder.Services.AddScoped<IAssignmentService, AssignmentService>();
builder.Services.AddScoped<ISubmissionService, SubmissionService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IPersonnelService, PersonnelService>();
builder.Services.AddScoped<IStorageService, LocalStorageService>();

// JWT Authentication Configuration
var jwtSecret = builder.Configuration["JwtSettings:Secret"];
if (string.IsNullOrWhiteSpace(jwtSecret) || jwtSecret.Length < 32)
{
    if (builder.Environment.IsProduction())
    {
        throw new InvalidOperationException("JwtSettings:Secret must be configured with at least 32 characters in production.");
    }

    jwtSecret = "LocalDevelopmentOnlySecretKey-ChangeMe-2026";
}
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"] ?? "SurveyAdminApi",
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JwtSettings:Audience"] ?? "SurveyAdminClients",
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Register Security & Rate Limiting Middleware
app.UseSecurityAndRateLimiting();

// Ensure Seed Data is Created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SurveyDbContext>();
    db.Database.EnsureCreated();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", async (SurveyDbContext db) =>
{
    var provider = db.Database.ProviderName ?? "unknown";
    try
    {
        var connected = await db.Database.CanConnectAsync();
        var persistent = !provider.Contains("InMemory", StringComparison.OrdinalIgnoreCase);
        var statusCode = connected && persistent
            ? StatusCodes.Status200OK
            : StatusCodes.Status503ServiceUnavailable;

        return Results.Json(new
        {
            status = connected && persistent ? "healthy" : "unhealthy",
            database = new { provider, connected, persistent }
        }, statusCode: statusCode);
    }
    catch
    {
        return Results.Json(new
        {
            status = "unhealthy",
            database = new { provider, connected = false, persistent = true }
        }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Run($"http://0.0.0.0:{port}");
