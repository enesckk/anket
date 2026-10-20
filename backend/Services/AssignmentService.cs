using Microsoft.EntityFrameworkCore;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface IAssignmentService
{
    Task<List<AssignmentDto>> GetAssignmentsForUserAsync(Guid userId);
    Task<List<AssignmentDto>> GetAllAssignmentsAsync();
    Task<AssignmentDto> CreateAssignmentAsync(CreateAssignmentRequest request);
    Task<bool> MarkAssignmentViewedAsync(Guid assignmentId, Guid userId);
}

public class AssignmentService : IAssignmentService
{
    private readonly SurveyDbContext _db;

    public AssignmentService(SurveyDbContext db)
    {
        _db = db;
    }

    public async Task<List<AssignmentDto>> GetAssignmentsForUserAsync(Guid userId)
    {
        var assignments = await _db.SurveyAssignments
            .Include(a => a.Survey)
            .Include(a => a.Village)
            .Include(a => a.AssignedUsers)
                .ThenInclude(au => au.User)
            .Include(a => a.Submissions)
            .Where(a => a.Survey != null &&
                        a.Survey.Status == SurveyStatus.ACTIVE &&
                        a.Status != AssignmentStatus.COMPLETED &&
                        a.AssignedUsers.Any(au => au.UserId == userId))
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        // Older deployments allowed the same survey to be assigned to one user
        // more than once. Keep those historical rows intact, but expose only the
        // newest active task for each survey so field users never see duplicates.
        return assignments
            .GroupBy(a => a.SurveyId)
            .Select(group => MapToAssignmentDto(group.First(), userId))
            .ToList();
    }

    public async Task<List<AssignmentDto>> GetAllAssignmentsAsync()
    {
        var assignments = await _db.SurveyAssignments
            .Include(a => a.Survey)
            .Include(a => a.Village)
            .Include(a => a.AssignedUsers)
                .ThenInclude(au => au.User)
            .Include(a => a.Submissions)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        return assignments.Select(a => MapToAssignmentDto(a, null)).ToList();
    }

    public async Task<AssignmentDto> CreateAssignmentAsync(CreateAssignmentRequest request)
    {
        var survey = await _db.Surveys.FindAsync(request.SurveyId);
        if (survey == null) throw new ArgumentException("Atanacak anket bulunamadı.");
        if (survey.Status != SurveyStatus.ACTIVE)
        {
            if (!request.PublishSurvey || survey.Status != SurveyStatus.DRAFT)
                throw new ArgumentException("Yalnızca aktif anketler atanabilir.");

            survey.Status = SurveyStatus.ACTIVE;
            survey.UpdatedAt = DateTime.UtcNow;
        }

        Village? village = null;
        if (request.VillageId.HasValue)
        {
            village = await _db.Villages.FirstOrDefaultAsync(v => v.Id == request.VillageId.Value && v.IsActive);
        }
        else if (!string.IsNullOrWhiteSpace(request.VillageName))
        {
            var villageName = request.VillageName.Trim();
            village = await _db.Villages.FirstOrDefaultAsync(v => v.IsActive && v.Name.ToLower() == villageName.ToLower());
            if (village == null)
            {
                village = new Village
                {
                    Name = villageName,
                    Region = "Genel",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };
                _db.Villages.Add(village);
            }
        }

        if (village == null)
            throw new ArgumentException("Geçerli bir hedef köy, mahalle veya bölge girilmelidir.");

        var requestedUserIds = (request.AssignedUserIds ?? new List<Guid>()).Distinct().ToList();
        var validUserIds = await _db.Users
            .Where(u => requestedUserIds.Contains(u.Id) && u.Role == UserRole.FIELD_USER && u.IsActive)
            .Select(u => u.Id)
            .ToListAsync();
        if (requestedUserIds.Count == 0 || validUserIds.Count != requestedUserIds.Count)
            throw new ArgumentException("Atamadaki tüm kullanıcılar aktif saha personeli olmalıdır.");
        if (request.TargetCount <= 0 || request.EndDate <= request.StartDate)
            throw new ArgumentException("Hedef sayı ve görev tarihleri geçerli olmalıdır.");

        var alreadyAssignedUserIds = await _db.SurveyAssignmentUsers
            .Where(au => validUserIds.Contains(au.UserId) &&
                         au.Assignment != null &&
                         au.Assignment.SurveyId == request.SurveyId)
            .Select(au => au.UserId)
            .Distinct()
            .ToListAsync();

        if (alreadyAssignedUserIds.Count > 0)
            throw new ArgumentException("Seçilen personellerden birine bu anket daha önce atanmış. Aynı anket aynı personele yalnızca bir kez atanabilir.");

        var assignment = new SurveyAssignment
        {
            SurveyId = request.SurveyId,
            VillageId = village.Id,
            TargetCount = request.TargetCount,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Note = request.Note,
            Status = AssignmentStatus.ASSIGNED,
            CreatedAt = DateTime.UtcNow
        };

        _db.SurveyAssignments.Add(assignment);

        foreach (var uid in validUserIds)
        {
            _db.SurveyAssignmentUsers.Add(new SurveyAssignmentUser
            {
                AssignmentId = assignment.Id,
                UserId = uid,
                ViewedAt = null
            });
        }

        await _db.SaveChangesAsync();

        var saved = await _db.SurveyAssignments
            .Include(a => a.Survey)
            .Include(a => a.Village)
            .Include(a => a.AssignedUsers)
                .ThenInclude(au => au.User)
            .Include(a => a.Submissions)
            .FirstAsync(a => a.Id == assignment.Id);

        return MapToAssignmentDto(saved, null);
    }

    public async Task<bool> MarkAssignmentViewedAsync(Guid assignmentId, Guid userId)
    {
        var au = await _db.SurveyAssignmentUsers
            .FirstOrDefaultAsync(x => x.AssignmentId == assignmentId && x.UserId == userId);

        if (au == null) return false;

        if (!au.ViewedAt.HasValue)
        {
            au.ViewedAt = DateTime.UtcNow;

            var assignment = await _db.SurveyAssignments.FindAsync(assignmentId);
            if (assignment != null && assignment.Status == AssignmentStatus.ASSIGNED)
            {
                assignment.Status = AssignmentStatus.VIEWED;
            }

            await _db.SaveChangesAsync();
        }

        return true;
    }

    private static AssignmentDto MapToAssignmentDto(SurveyAssignment a, Guid? currentUserId)
    {
        DateTime? viewedAt = null;
        if (currentUserId.HasValue)
        {
            var userRel = a.AssignedUsers.FirstOrDefault(au => au.UserId == currentUserId.Value);
            viewedAt = userRel?.ViewedAt;
        }
        else
        {
            viewedAt = a.AssignedUsers.FirstOrDefault(au => au.ViewedAt.HasValue)?.ViewedAt;
        }

        var users = a.AssignedUsers.Where(au => au.User != null).Select(au => new UserDto(
            au.User!.Id, au.User.Username, au.User.Email, au.User.Phone, au.User.FullName, au.User.Role.ToString(), au.User.IsActive
        )).ToList();

        var completedCount = a.Submissions.Count(s => !s.IsInvalid);

        return new AssignmentDto(
            a.Id,
            a.SurveyId,
            a.Survey?.Title ?? "Anket",
            a.VillageId,
            DisplayTextSanitizer.Region(a.Village?.Name),
            a.TargetCount,
            completedCount,
            a.StartDate,
            a.EndDate,
            DisplayTextSanitizer.Text(a.Note),
            a.Status.ToString(),
            viewedAt,
            users
        );
    }
}
