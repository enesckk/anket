using Microsoft.EntityFrameworkCore;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface ISurveyService
{
    Task<List<SurveyDto>> GetAllSurveysAsync(string? status, string? source);
    Task<SurveyDto?> GetSurveyByIdAsync(Guid id);
    Task<SurveyDto> CreateSurveyAsync(CreateSurveyRequest request, Guid userId);
    Task<SurveyDto?> CloneSurveyAsync(Guid surveyId, Guid userId);
    Task<SurveyDto?> UpdateSurveyStatusAsync(Guid id, string status);
    Task<SurveyQuestionDto> AddQuestionAsync(Guid surveyId, CreateQuestionRequest request);
    Task<bool> DeleteSurveyAsync(Guid surveyId);
}

public class SurveyService : ISurveyService
{
    private readonly SurveyDbContext _db;

    public SurveyService(SurveyDbContext db)
    {
        _db = db;
    }

    public async Task<List<SurveyDto>> GetAllSurveysAsync(string? status, string? source)
    {
        var query = _db.Surveys
            .Include(s => s.CreatedByUser)
            .Include(s => s.Sections)
                .ThenInclude(sec => sec.Questions)
                    .ThenInclude(q => q.Options)
            .Include(s => s.Questions)
                .ThenInclude(q => q.Options)
            .AsNoTracking();

        if (!string.IsNullOrEmpty(status) && Enum.TryParse<SurveyStatus>(status, true, out var sEnum))
        {
            query = query.Where(s => s.Status == sEnum);
        }

        if (!string.IsNullOrEmpty(source) && Enum.TryParse<SurveySource>(source, true, out var srcEnum))
        {
            query = query.Where(s => s.Source == srcEnum);
        }

        var surveys = await query.OrderByDescending(s => s.CreatedAt).ToListAsync();
        return surveys.Select(MapToSurveyDto).ToList();
    }

    public async Task<SurveyDto?> GetSurveyByIdAsync(Guid id)
    {
        var survey = await _db.Surveys
            .Include(s => s.CreatedByUser)
            .Include(s => s.Sections)
                .ThenInclude(sec => sec.Questions)
                    .ThenInclude(q => q.Options)
            .Include(s => s.Questions)
                .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(s => s.Id == id);

        return survey == null ? null : MapToSurveyDto(survey);
    }

    public async Task<SurveyDto> CreateSurveyAsync(CreateSurveyRequest request, Guid userId)
    {
        Enum.TryParse<SurveySource>(request.Source, true, out var src);

        var survey = new Survey
        {
            Title = request.Title,
            Description = request.Description,
            Status = SurveyStatus.DRAFT,
            Source = src,
            CreatedByUserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Surveys.Add(survey);
        await _db.SaveChangesAsync();

        return await GetSurveyByIdAsync(survey.Id) ?? MapToSurveyDto(survey);
    }

    public async Task<SurveyDto?> CloneSurveyAsync(Guid surveyId, Guid userId)
    {
        var original = await _db.Surveys
            .Include(s => s.Sections)
            .Include(s => s.Questions)
                .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(s => s.Id == surveyId);

        if (original == null) return null;

        var clonedSurvey = new Survey
        {
            Title = $"{original.Title} (Kopya)",
            Description = original.Description,
            Status = SurveyStatus.DRAFT,
            Source = SurveySource.ADMIN,
            CreatedByUserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Surveys.Add(clonedSurvey);
        await _db.SaveChangesAsync();

        var sectionMapping = new Dictionary<Guid, Guid>();
        foreach (var sec in original.Sections)
        {
            var newSec = new SurveySection
            {
                SurveyId = clonedSurvey.Id,
                Title = sec.Title,
                Order = sec.Order
            };
            _db.SurveySections.Add(newSec);
            await _db.SaveChangesAsync();
            sectionMapping[sec.Id] = newSec.Id;
        }

        var questionMapping = new Dictionary<Guid, Guid>();
        foreach (var q in original.Questions)
        {
            var newQ = new SurveyQuestion
            {
                SurveyId = clonedSurvey.Id,
                SectionId = q.SectionId.HasValue && sectionMapping.ContainsKey(q.SectionId.Value) ? sectionMapping[q.SectionId.Value] : null,
                Title = q.Title,
                Description = q.Description,
                Type = q.Type,
                IsRequired = q.IsRequired,
                Order = q.Order,
                ConditionSourceQuestionId = q.ConditionSourceQuestionId,
                ConditionOperator = q.ConditionOperator,
                ConditionValue = q.ConditionValue,
                MinValue = q.MinValue,
                MaxValue = q.MaxValue,
                IsActive = true
            };
            _db.SurveyQuestions.Add(newQ);
            await _db.SaveChangesAsync();
            questionMapping[q.Id] = newQ.Id;

            foreach (var opt in q.Options)
            {
                _db.SurveyQuestionOptions.Add(new SurveyQuestionOption
                {
                    QuestionId = newQ.Id,
                    Label = opt.Label,
                    Value = opt.Value,
                    Order = opt.Order,
                    IsActive = true
                });
            }
        }

        // Remap condition source question IDs
        var clonedQuestions = await _db.SurveyQuestions.Where(q => q.SurveyId == clonedSurvey.Id).ToListAsync();
        foreach (var cq in clonedQuestions)
        {
            if (cq.ConditionSourceQuestionId.HasValue && questionMapping.ContainsKey(cq.ConditionSourceQuestionId.Value))
            {
                cq.ConditionSourceQuestionId = questionMapping[cq.ConditionSourceQuestionId.Value];
            }
        }

        await _db.SaveChangesAsync();
        return await GetSurveyByIdAsync(clonedSurvey.Id);
    }

    public async Task<SurveyDto?> UpdateSurveyStatusAsync(Guid id, string status)
    {
        var survey = await _db.Surveys.FindAsync(id);
        if (survey == null) return null;

        if (Enum.TryParse<SurveyStatus>(status, true, out var sEnum))
        {
            survey.Status = sEnum;
            survey.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }

        return await GetSurveyByIdAsync(id);
    }

    public async Task<SurveyQuestionDto> AddQuestionAsync(Guid surveyId, CreateQuestionRequest request)
    {
        Enum.TryParse<QuestionType>(request.Type, true, out var qType);
        Enum.TryParse<ConditionOperator>(request.ConditionOperator, true, out var condOp);

        var q = new SurveyQuestion
        {
            SurveyId = surveyId,
            SectionId = request.SectionId,
            Title = request.Title,
            Description = request.Description,
            Type = qType,
            IsRequired = request.IsRequired,
            Order = request.Order,
            ConditionSourceQuestionId = request.ConditionSourceQuestionId,
            ConditionOperator = request.ConditionSourceQuestionId.HasValue ? condOp : null,
            ConditionValue = request.ConditionValue,
            IsActive = true
        };

        _db.SurveyQuestions.Add(q);
        await _db.SaveChangesAsync();

        if (request.Options != null)
        {
            foreach (var opt in request.Options)
            {
                _db.SurveyQuestionOptions.Add(new SurveyQuestionOption
                {
                    QuestionId = q.Id,
                    Label = opt.Label,
                    Value = opt.Value,
                    Order = opt.Order,
                    IsActive = true
                });
            }
            await _db.SaveChangesAsync();
        }

        var savedQ = await _db.SurveyQuestions
            .Include(x => x.Options)
            .FirstAsync(x => x.Id == q.Id);

        return MapToQuestionDto(savedQ);
    }

    public async Task<bool> DeleteSurveyAsync(Guid surveyId)
    {
        var survey = await _db.Surveys.FindAsync(surveyId);
        if (survey == null) return false;

        // Soft close if submissions exist to prevent data loss
        var hasSubmissions = await _db.SurveySubmissions.AnyAsync(s => s.SurveyId == surveyId);
        if (hasSubmissions)
        {
            survey.Status = SurveyStatus.CLOSED;
        }
        else
        {
            _db.Surveys.Remove(survey);
        }

        await _db.SaveChangesAsync();
        return true;
    }

    private static SurveyDto MapToSurveyDto(Survey s)
    {
        var sectionDtos = s.Sections.OrderBy(x => x.Order).Select(sec => new SurveySectionDto(
            sec.Id,
            sec.Title,
            sec.Order,
            sec.Questions.OrderBy(q => q.Order).Select(MapToQuestionDto).ToList()
        )).ToList();

        var unsectionedQuestions = s.Questions
            .Where(q => q.SectionId == null)
            .OrderBy(q => q.Order)
            .Select(MapToQuestionDto)
            .ToList();

        return new SurveyDto(
            s.Id,
            s.Title,
            s.Description,
            s.Status.ToString(),
            s.Source.ToString(),
            s.CreatedByUserId,
            s.CreatedByUser?.FullName ?? "Admin",
            s.CreatedAt,
            s.UpdatedAt,
            sectionDtos,
            unsectionedQuestions
        );
    }

    private static SurveyQuestionDto MapToQuestionDto(SurveyQuestion q)
    {
        return new SurveyQuestionDto(
            q.Id,
            q.SectionId,
            q.Title,
            q.Description,
            q.Type.ToString(),
            q.IsRequired,
            q.Order,
            q.ConditionSourceQuestionId,
            q.ConditionOperator?.ToString(),
            q.ConditionValue,
            q.MinValue,
            q.MaxValue,
            q.Options.OrderBy(o => o.Order).Select(o => new SurveyQuestionOptionDto(o.Id, o.Label, o.Value, o.Order)).ToList()
        );
    }
}
