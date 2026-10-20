using System.Text.RegularExpressions;

namespace SurveyAdmin.Api.Services;

internal static partial class DisplayTextSanitizer
{
    [GeneratedRegex(@"Sinan\s+K[oö]y[uü]", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant)]
    private static partial Regex LegacyRegionRegex();

    public static string Text(string? value) =>
        LegacyRegionRegex().Replace(value ?? string.Empty, "Genel Saha");

    public static string Region(string? value)
    {
        var sanitized = Text(value).Trim();
        return string.IsNullOrWhiteSpace(sanitized) ? "Genel Saha" : sanitized;
    }
}
