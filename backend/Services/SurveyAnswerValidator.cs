using System.Globalization;
using System.Net.Mail;
using System.Text.RegularExpressions;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

internal static partial class SurveyAnswerValidator
{
    [GeneratedRegex(@"[^a-z0-9]", RegexOptions.CultureInvariant)]
    private static partial Regex NonAlphaNumericRegex();

    [GeneratedRegex(@"^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,119}$")]
    private static partial Regex FullNameRegex();

    public static string? Validate(
        string questionTitle,
        QuestionType questionType,
        string? answerValue,
        double? minValue = null,
        double? maxValue = null,
        IReadOnlyCollection<string>? allowedOptions = null,
        string? fileBase64 = null)
    {
        var raw = (answerValue ?? string.Empty).Trim();
        if (string.IsNullOrEmpty(raw) && string.IsNullOrWhiteSpace(fileBase64)) return null;

        var title = NormalizeTitle(questionTitle);
        if (title.Contains("tckimlik") || title.Contains("kimlikno") || title.Contains("kimliknumara"))
        {
            if (!IsValidTurkishId(raw))
                return $"{questionTitle}: 11 haneli, rakamlardan oluşan geçerli bir T.C. kimlik numarası giriniz.";
        }
        else if (title.Contains("telefon") || title.Contains("ceptelefon") || title.Contains("gsm"))
        {
            if (!IsValidTurkishPhone(raw))
                return $"{questionTitle}: Geçerli bir cep telefonu giriniz (05xx xxx xx xx veya 5xx xxx xx xx).";
        }
        else if (title.Contains("eposta") || title.Contains("email"))
        {
            if (!MailAddress.TryCreate(raw, out var address) || !string.Equals(address.Address, raw, StringComparison.OrdinalIgnoreCase))
                return $"{questionTitle}: Geçerli bir e-posta adresi giriniz.";
        }
        else if (questionType == QuestionType.TEXT &&
                 (title is "adsoyad" or "adisoyadi" or "adivesoyadi") &&
                 !FullNameRegex().IsMatch(raw))
        {
            return $"{questionTitle}: Geçerli bir ad ve soyad giriniz.";
        }

        switch (questionType)
        {
            case QuestionType.TEXT when raw.Length > 2000:
                return $"{questionTitle}: Cevap 2000 karakterden uzun olamaz.";

            case QuestionType.NUMBER:
                if (!double.TryParse(raw, NumberStyles.AllowLeadingSign | NumberStyles.AllowDecimalPoint,
                        CultureInfo.InvariantCulture, out var number) || !double.IsFinite(number))
                    return $"{questionTitle}: Geçerli bir sayı giriniz.";
                if (IsAgeTitle(title) && (number < 0 || number > 120 || number != Math.Truncate(number)))
                    return $"{questionTitle}: Yaşı 0 ile 120 arasında tam sayı olarak giriniz.";
                if (IsCountTitle(title) && (number < 0 || number != Math.Truncate(number)))
                    return $"{questionTitle}: Sıfır veya daha büyük bir tam sayı giriniz.";
                if (minValue.HasValue && number < minValue.Value)
                    return $"{questionTitle}: Değer en az {minValue.Value.ToString(CultureInfo.InvariantCulture)} olmalıdır.";
                if (maxValue.HasValue && number > maxValue.Value)
                    return $"{questionTitle}: Değer en fazla {maxValue.Value.ToString(CultureInfo.InvariantCulture)} olmalıdır.";
                break;

            case QuestionType.DATE:
                if (!DateOnly.TryParseExact(raw, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
                    return $"{questionTitle}: Geçerli bir tarih seçiniz.";
                break;

            case QuestionType.YES_NO:
                if (raw is not "Evet" and not "Hayır")
                    return $"{questionTitle}: Yalnızca Evet veya Hayır seçilebilir.";
                break;

            case QuestionType.SINGLE_CHOICE:
                if (allowedOptions == null || allowedOptions.Count == 0 || !allowedOptions.Contains(raw, StringComparer.Ordinal))
                    return $"{questionTitle}: Listede bulunan seçeneklerden birini seçiniz.";
                break;

            case QuestionType.MULTIPLE_CHOICE:
                var selected = raw.Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (allowedOptions == null || allowedOptions.Count == 0 || selected.Length == 0 ||
                    selected.Distinct(StringComparer.Ordinal).Count() != selected.Length ||
                    selected.Any(item => !allowedOptions.Contains(item, StringComparer.Ordinal)))
                    return $"{questionTitle}: Yalnızca listede bulunan seçenekleri seçiniz.";
                break;

            case QuestionType.LOCATION:
                var coordinates = raw.Split(',', StringSplitOptions.TrimEntries);
                if (coordinates.Length != 2 ||
                    !double.TryParse(coordinates[0], NumberStyles.Float, CultureInfo.InvariantCulture, out var latitude) ||
                    !double.TryParse(coordinates[1], NumberStyles.Float, CultureInfo.InvariantCulture, out var longitude) ||
                    !double.IsFinite(latitude) || !double.IsFinite(longitude) ||
                    latitude is < -90 or > 90 || longitude is < -180 or > 180)
                    return $"{questionTitle}: Geçerli bir konum alınmalıdır.";
                break;

            case QuestionType.PHOTO when !string.IsNullOrWhiteSpace(fileBase64):
                if (!IsValidPhoto(fileBase64))
                    return $"{questionTitle}: Fotoğraf verisi geçersiz veya 5 MB sınırını aşıyor.";
                break;
        }

        return null;
    }

    private static bool IsAgeTitle(string title) =>
        title == "yas" || title.EndsWith("yasi", StringComparison.Ordinal) || title.Contains("yasiniz") ||
        title.Contains("yasinda") || title.Contains("kacyas");

    private static bool IsCountTitle(string title) =>
        title.Contains("kackisi") || title.Contains("kaccocuk") || title.Contains("sayisi") ||
        title.Contains("adedi") || title.Contains("adet");

    private static string NormalizeTitle(string value) => NonAlphaNumericRegex().Replace(
        value.ToLowerInvariant()
            .Replace('ı', 'i').Replace('ş', 's').Replace('ğ', 'g')
            .Replace('ü', 'u').Replace('ö', 'o').Replace('ç', 'c'),
        string.Empty);

    private static bool IsValidTurkishId(string value)
    {
        if (value.Length != 11 || value[0] == '0' || value.Any(c => !char.IsAsciiDigit(c))) return false;
        var numbers = value.Select(c => c - '0').ToArray();
        var oddSum = numbers[0] + numbers[2] + numbers[4] + numbers[6] + numbers[8];
        var evenSum = numbers[1] + numbers[3] + numbers[5] + numbers[7];
        return ((oddSum * 7 - evenSum) % 10 + 10) % 10 == numbers[9]
            && numbers.Take(10).Sum() % 10 == numbers[10];
    }

    private static bool IsValidTurkishPhone(string value)
    {
        if (value.Any(c => !char.IsDigit(c) && c is not '+' and not '(' and not ')' and not ' ' and not '-')) return false;
        if (value.Count(c => c == '+') > 1 || (value.Contains('+') && !value.StartsWith('+'))) return false;
        var digits = new string(value.Where(char.IsDigit).ToArray());
        if (digits.StartsWith("90") && digits.Length == 12) digits = digits[2..];
        if (digits.StartsWith('0') && digits.Length == 11) digits = digits[1..];
        return digits.Length == 10 && digits[0] == '5' && digits.All(char.IsDigit);
    }

    private static bool IsValidPhoto(string fileBase64)
    {
        if (fileBase64.Length > 7_000_000) return false;
        try
        {
            return Convert.FromBase64String(fileBase64).Length <= 5_000_000;
        }
        catch (FormatException)
        {
            return false;
        }
    }
}
