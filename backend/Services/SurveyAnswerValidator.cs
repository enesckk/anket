using System.Text.RegularExpressions;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

internal static partial class SurveyAnswerValidator
{
    [GeneratedRegex(@"[^a-z0-9]", RegexOptions.CultureInvariant)]
    private static partial Regex NonAlphaNumericRegex();

    public static string? Validate(string questionTitle, QuestionType questionType, string? answerValue)
    {
        if (questionType is not QuestionType.TEXT and not QuestionType.NUMBER || string.IsNullOrWhiteSpace(answerValue))
            return null;

        var title = NormalizeTitle(questionTitle);
        if (title.Contains("tckimlik") || title.Contains("kimlikno") || title.Contains("kimliknumara"))
        {
            if (!IsValidTurkishId(answerValue))
                return $"{questionTitle}: 11 haneli, rakamlardan oluşan geçerli bir T.C. kimlik numarası giriniz.";
        }
        else if (title.Contains("telefon") || title.Contains("ceptelefon") || title.Contains("gsm"))
        {
            if (!IsValidTurkishPhone(answerValue))
                return $"{questionTitle}: Geçerli bir cep telefonu giriniz (05xx xxx xx xx veya 5xx xxx xx xx).";
        }

        return null;
    }

    private static string NormalizeTitle(string value) => NonAlphaNumericRegex().Replace(
        value.ToLowerInvariant()
            .Replace('ı', 'i').Replace('ş', 's').Replace('ğ', 'g')
            .Replace('ü', 'u').Replace('ö', 'o').Replace('ç', 'c'),
        string.Empty);

    private static bool IsValidTurkishId(string value)
    {
        var digits = new string(value.Where(char.IsDigit).ToArray());
        if (digits.Length != 11 || digits[0] == '0' || digits != value.Trim()) return false;
        var numbers = digits.Select(c => c - '0').ToArray();
        var oddSum = numbers[0] + numbers[2] + numbers[4] + numbers[6] + numbers[8];
        var evenSum = numbers[1] + numbers[3] + numbers[5] + numbers[7];
        return ((oddSum * 7 - evenSum) % 10 + 10) % 10 == numbers[9]
            && numbers.Take(10).Sum() % 10 == numbers[10];
    }

    private static bool IsValidTurkishPhone(string value)
    {
        var raw = value.Trim();
        if (raw.Any(c => !char.IsDigit(c) && c is not '+' and not '(' and not ')' and not ' ' and not '-')) return false;
        if (raw.Count(c => c == '+') > 1 || (raw.Contains('+') && !raw.StartsWith('+'))) return false;
        var digits = new string(raw.Where(char.IsDigit).ToArray());
        if (digits.StartsWith("90") && digits.Length == 12) digits = digits[2..];
        if (digits.StartsWith('0') && digits.Length == 11) digits = digits[1..];
        return digits.Length == 10 && digits[0] == '5' && digits.All(char.IsDigit);
    }
}
