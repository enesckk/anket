using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using System.Text.RegularExpressions;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface ISubmissionService
{
    Task<SubmissionDto> CreateSubmissionAsync(CreateSubmissionRequest request, Guid userId);
    Task<SubmissionDto> CreatePublicSubmissionAsync(Guid surveyId, CreatePublicSubmissionRequest request);
    Task<List<SubmissionDto>> GetSubmissionsAsync(Guid? surveyId, Guid? villageId, Guid? fieldUserId, bool includeInvalid = false);
    Task<SubmissionDto?> GetSubmissionByIdAsync(Guid id);
    Task<bool> ToggleInvalidSubmissionAsync(Guid id, Guid adminUserId);
}

public class SubmissionService : ISubmissionService
{
    private const string PublicSubmissionPrefix = "public:";
    private readonly SurveyDbContext _db;
    private readonly IWebHostEnvironment _env;

    public SubmissionService(SurveyDbContext db, IWebHostEnvironment env)
    {
        _db = db;
        _env = env;
    }

    public async Task<SubmissionDto> CreateSubmissionAsync(CreateSubmissionRequest request, Guid userId)
    {
        // IDEMPOTENCY CHECK: If ClientSubmissionId already exists, return existing submission!
        var existing = await _db.SurveySubmissions
            .Include(s => s.Survey)
            .Include(s => s.FieldUser)
            .Include(s => s.Village)
            .Include(s => s.Answers)
                .ThenInclude(a => a.Question)
            .FirstOrDefaultAsync(s => s.ClientSubmissionId == request.ClientSubmissionId);

        if (existing != null)
        {
            if (existing.FieldUserId != userId)
                throw new UnauthorizedAccessException("Bu kayıt başka bir kullanıcıya aittir.");
            return MapToSubmissionDto(existing);
        }

        if (!request.AssignmentId.HasValue)
            throw new ArgumentException("Anket gönderimi için geçerli bir görev ataması gereklidir.");

        var assignment = await _db.SurveyAssignments
            .Include(a => a.AssignedUsers)
            .FirstOrDefaultAsync(a => a.Id == request.AssignmentId.Value);

        if (assignment == null || !assignment.AssignedUsers.Any(au => au.UserId == userId))
            throw new UnauthorizedAccessException("Bu anket kullanıcıya atanmamıştır.");
        if (assignment.SurveyId != request.SurveyId)
            throw new ArgumentException("Görev ile anket bilgisi eşleşmiyor.");
        if (request.VillageId.HasValue && assignment.VillageId != request.VillageId.Value)
            throw new ArgumentException("Görev ile bölge bilgisi eşleşmiyor.");

        var surveyQuestions = await _db.SurveyQuestions
            .Where(q => q.SurveyId == request.SurveyId && q.IsActive)
            .Select(q => new { q.Id, q.Title, q.Type, q.IsRequired })
            .ToListAsync();
        var validQuestionIds = surveyQuestions.Select(q => q.Id).ToHashSet();
        if (request.Answers.Any(a => !validQuestionIds.Contains(a.QuestionId)))
            throw new ArgumentException("Yanıtlardan biri bu ankete ait olmayan bir soru içeriyor.");
        var answeredQuestionIds = request.Answers
            .Where(a => !string.IsNullOrWhiteSpace(a.AnswerValue) || !string.IsNullOrWhiteSpace(a.FileBase64))
            .Select(a => a.QuestionId)
            .ToHashSet();
        if (surveyQuestions.Where(q => q.IsRequired).Any(q => !answeredQuestionIds.Contains(q.Id)))
            throw new ArgumentException("Zorunlu soruların tamamı cevaplanmalıdır.");
        foreach (var answer in request.Answers)
        {
            var question = surveyQuestions.First(q => q.Id == answer.QuestionId);
            var validationError = SurveyAnswerValidator.Validate(question.Title, question.Type, answer.AnswerValue);
            if (validationError != null) throw new ArgumentException(validationError);
        }

        Enum.TryParse<SyncSource>(request.SyncSource, true, out var src);

        var submission = new SurveySubmission
        {
            ClientSubmissionId = request.ClientSubmissionId,
            SurveyId = request.SurveyId,
            AssignmentId = request.AssignmentId,
            FieldUserId = userId,
            VillageId = request.VillageId ?? assignment.VillageId,
            StartedAt = request.StartedAt,
            CompletedAt = request.CompletedAt,
            SubmittedAt = DateTime.UtcNow,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Accuracy = request.Accuracy,
            SyncSource = src,
            IsInvalid = false
        };

        _db.SurveySubmissions.Add(submission);
        await _db.SaveChangesAsync();

        var uploadsFolder = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        foreach (var ans in request.Answers)
        {
            string? filePath = null;

            if (!string.IsNullOrEmpty(ans.FileBase64))
            {
                try
                {
                    var fileBytes = Convert.FromBase64String(ans.FileBase64);
                    var safeFileName = $"{Guid.NewGuid()}_{Path.GetFileName(ans.FileName ?? "photo.jpg")}";
                    var fullPath = Path.Combine(uploadsFolder, safeFileName);
                    await File.WriteAllBytesAsync(fullPath, fileBytes);
                    filePath = $"/uploads/{safeFileName}";
                }
                catch
                {
                    // Fallback if file decode fails
                }
            }

            _db.SurveyAnswers.Add(new SurveyAnswer
            {
                SubmissionId = submission.Id,
                QuestionId = ans.QuestionId,
                AnswerValue = ans.AnswerValue ?? string.Empty,
                FilePath = filePath
            });
        }

        await _db.SaveChangesAsync();

        return await GetSubmissionByIdAsync(submission.Id) ?? MapToSubmissionDto(submission);
    }

    public async Task<SubmissionDto> CreatePublicSubmissionAsync(Guid surveyId, CreatePublicSubmissionRequest request)
    {
        var interviewerName = (request.RespondentName ?? string.Empty).Trim();
        if (!Regex.IsMatch(interviewerName, @"^[\p{L}\p{M}][\p{L}\p{M}\s'.-]{1,119}$"))
            throw new ArgumentException("Lütfen anketörün geçerli adını ve soyadını giriniz.");
        if (string.IsNullOrWhiteSpace(request.ClientSubmissionId) || request.ClientSubmissionId.Length > 80 ||
            !Regex.IsMatch(request.ClientSubmissionId, @"^[A-Za-z0-9-]+$"))
            throw new ArgumentException("Geçersiz istemci kayıt kimliği.");
        if (request.Answers == null || request.Answers.Count > 250)
            throw new ArgumentException("Anket cevapları geçersiz.");

        var encodedName = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(interviewerName));
        var storedClientId = $"{PublicSubmissionPrefix}{encodedName}:{request.ClientSubmissionId}";
        var existing = await _db.SurveySubmissions
            .Include(s => s.Survey).Include(s => s.FieldUser).Include(s => s.Village)
            .Include(s => s.Answers).ThenInclude(a => a.Question)
            .FirstOrDefaultAsync(s => s.ClientSubmissionId == storedClientId);
        if (existing != null) return MapToSubmissionDto(existing);

        var survey = await _db.Surveys.AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == surveyId && s.Status == SurveyStatus.ACTIVE);
        if (survey == null)
            throw new InvalidOperationException("Bu anket bağlantısı aktif değil veya artık kullanılamıyor.");

        var surveyQuestions = await _db.SurveyQuestions
            .Where(q => q.SurveyId == surveyId && q.IsActive)
            .Select(q => new { q.Id, q.Title, q.Type, q.IsRequired, q.ConditionSourceQuestionId, q.ConditionOperator, q.ConditionValue })
            .ToListAsync();
        var validQuestionIds = surveyQuestions.Select(q => q.Id).ToHashSet();
        if (request.Answers.GroupBy(a => a.QuestionId).Any(g => g.Count() > 1) ||
            request.Answers.Any(a => !validQuestionIds.Contains(a.QuestionId)))
            throw new ArgumentException("Yanıtlardan biri bu ankete ait olmayan veya tekrarlanan bir soru içeriyor.");

        var answerValues = request.Answers.ToDictionary(a => a.QuestionId, a => a.AnswerValue ?? string.Empty);
        var visibleRequiredQuestionIds = surveyQuestions.Where(q =>
        {
            if (!q.IsRequired) return false;
            if (!q.ConditionSourceQuestionId.HasValue) return true;
            if (!answerValues.TryGetValue(q.ConditionSourceQuestionId.Value, out var sourceValue) || string.IsNullOrWhiteSpace(sourceValue)) return false;
            var values = sourceValue.Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            var matches = values.Contains(q.ConditionValue ?? string.Empty, StringComparer.Ordinal);
            return q.ConditionOperator == ConditionOperator.NOT_EQUALS ? !matches : matches;
        }).Select(q => q.Id).ToHashSet();

        var answeredQuestionIds = request.Answers
            .Where(a => !string.IsNullOrWhiteSpace(a.AnswerValue) || !string.IsNullOrWhiteSpace(a.FileBase64))
            .Select(a => a.QuestionId).ToHashSet();
        if (visibleRequiredQuestionIds.Any(id => !answeredQuestionIds.Contains(id)))
            throw new ArgumentException("Zorunlu soruların tamamı cevaplanmalıdır.");
        foreach (var answer in request.Answers)
        {
            var question = surveyQuestions.First(q => q.Id == answer.QuestionId);
            var validationError = SurveyAnswerValidator.Validate(question.Title, question.Type, answer.AnswerValue);
            if (validationError != null) throw new ArgumentException(validationError);
        }

        var submission = new SurveySubmission
        {
            ClientSubmissionId = storedClientId,
            SurveyId = surveyId,
            AssignmentId = null,
            FieldUserId = survey.CreatedByUserId,
            VillageId = null,
            StartedAt = request.StartedAt,
            CompletedAt = request.CompletedAt,
            SubmittedAt = DateTime.UtcNow,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            Accuracy = request.Accuracy,
            SyncSource = SyncSource.ONLINE,
            IsInvalid = false
        };
        _db.SurveySubmissions.Add(submission);
        await _db.SaveChangesAsync();

        var uploadsFolder = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsFolder);
        foreach (var ans in request.Answers)
        {
            string? filePath = null;
            if (!string.IsNullOrWhiteSpace(ans.FileBase64))
            {
                try
                {
                    if (ans.FileBase64.Length > 7_000_000) throw new ArgumentException("Fotoğraf boyutu çok büyük.");
                    var fileBytes = Convert.FromBase64String(ans.FileBase64);
                    if (fileBytes.Length > 5_000_000) throw new ArgumentException("Fotoğraf boyutu çok büyük.");
                    var safeFileName = $"{Guid.NewGuid()}_{Path.GetFileName(ans.FileName ?? "photo.jpg")}";
                    await File.WriteAllBytesAsync(Path.Combine(uploadsFolder, safeFileName), fileBytes);
                    filePath = $"/uploads/{safeFileName}";
                }
                catch (FormatException)
                {
                    throw new ArgumentException("Fotoğraf verisi geçersiz.");
                }
            }
            _db.SurveyAnswers.Add(new SurveyAnswer
            {
                SubmissionId = submission.Id,
                QuestionId = ans.QuestionId,
                AnswerValue = ans.AnswerValue ?? string.Empty,
                FilePath = filePath
            });
        }
        await _db.SaveChangesAsync();
        return await GetSubmissionByIdAsync(submission.Id) ?? MapToSubmissionDto(submission);
    }

    public async Task<List<SubmissionDto>> GetSubmissionsAsync(Guid? surveyId, Guid? villageId, Guid? fieldUserId, bool includeInvalid = false)
    {
        var query = _db.SurveySubmissions
            .Include(s => s.Survey)
            .Include(s => s.FieldUser)
            .Include(s => s.Village)
            .Include(s => s.Answers)
                .ThenInclude(a => a.Question)
            .AsNoTracking();

        if (!includeInvalid)
        {
            query = query.Where(s => !s.IsInvalid);
        }

        if (surveyId.HasValue) query = query.Where(s => s.SurveyId == surveyId.Value);
        if (villageId.HasValue) query = query.Where(s => s.VillageId == villageId.Value);
        if (fieldUserId.HasValue) query = query.Where(s => s.FieldUserId == fieldUserId.Value);

        var list = await query.OrderByDescending(s => s.SubmittedAt).ToListAsync();
        return list.Select(MapToSubmissionDto).ToList();
    }

    public async Task<SubmissionDto?> GetSubmissionByIdAsync(Guid id)
    {
        var submission = await _db.SurveySubmissions
            .Include(s => s.Survey)
            .Include(s => s.FieldUser)
            .Include(s => s.Village)
            .Include(s => s.Answers)
                .ThenInclude(a => a.Question)
            .FirstOrDefaultAsync(s => s.Id == id);

        return submission == null ? null : MapToSubmissionDto(submission);
    }

    public async Task<bool> ToggleInvalidSubmissionAsync(Guid id, Guid adminUserId)
    {
        var submission = await _db.SurveySubmissions.FindAsync(id);
        if (submission == null) return false;

        submission.IsInvalid = !submission.IsInvalid;
        submission.InvalidatedAt = submission.IsInvalid ? DateTime.UtcNow : null;
        submission.InvalidatedByUserId = submission.IsInvalid ? adminUserId : null;

        await _db.SaveChangesAsync();
        return true;
    }

    private static SubmissionDto MapToSubmissionDto(SurveySubmission s)
    {
        var answers = s.Answers.Select(a => new AnswerDto(
            a.Id,
            a.QuestionId,
            a.Question?.Title ?? "Soru",
            a.Question?.Type.ToString() ?? "TEXT",
            a.AnswerValue,
            a.FilePath
        )).ToList();

        var publicInterviewerName = GetPublicInterviewerName(s.ClientSubmissionId);
        var fieldUserName = publicInterviewerName ?? s.FieldUser?.FullName ?? "Saha Personeli";
        return new SubmissionDto(
            s.Id,
            s.ClientSubmissionId,
            s.SurveyId,
            s.Survey?.Title ?? "Anket",
            s.AssignmentId,
            s.FieldUserId,
            fieldUserName,
            s.VillageId,
            publicInterviewerName != null ? "Anketör Linki" : DisplayTextSanitizer.Region(s.Village?.Name),
            s.StartedAt,
            s.CompletedAt,
            s.SubmittedAt,
            s.Latitude,
            s.Longitude,
            s.Accuracy,
            s.SyncSource.ToString(),
            s.IsInvalid,
            answers
        );
    }

    private static string? GetPublicInterviewerName(string clientSubmissionId)
    {
        if (!clientSubmissionId.StartsWith(PublicSubmissionPrefix, StringComparison.Ordinal)) return null;
        var parts = clientSubmissionId.Split(':', 3);
        if (parts.Length != 3) return null;
        try { return Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(parts[1])); }
        catch { return "Bağlantı Katılımcısı"; }
    }
}
