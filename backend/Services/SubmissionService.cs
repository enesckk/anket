using Microsoft.EntityFrameworkCore;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface ISubmissionService
{
    Task<SubmissionDto> CreateSubmissionAsync(CreateSubmissionRequest request, Guid userId);
    Task<List<SubmissionDto>> GetSubmissionsAsync(Guid? surveyId, Guid? villageId, Guid? fieldUserId, bool includeInvalid = false);
    Task<SubmissionDto?> GetSubmissionByIdAsync(Guid id);
    Task<bool> ToggleInvalidSubmissionAsync(Guid id, Guid adminUserId);
}

public class SubmissionService : ISubmissionService
{
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
            return MapToSubmissionDto(existing);
        }

        Enum.TryParse<SyncSource>(request.SyncSource, true, out var src);

        var submission = new SurveySubmission
        {
            ClientSubmissionId = request.ClientSubmissionId,
            SurveyId = request.SurveyId,
            AssignmentId = request.AssignmentId,
            FieldUserId = userId,
            VillageId = request.VillageId,
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

        return new SubmissionDto(
            s.Id,
            s.ClientSubmissionId,
            s.SurveyId,
            s.Survey?.Title ?? "Anket",
            s.AssignmentId,
            s.FieldUserId,
            s.FieldUser?.FullName ?? "Saha Personeli",
            s.VillageId,
            s.Village?.Name ?? "Köy",
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
}
