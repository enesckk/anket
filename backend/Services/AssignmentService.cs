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
            .Where(a => a.AssignedUsers.Any(au => au.UserId == userId))
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        return assignments.Select(a => MapToAssignmentDto(a, userId)).ToList();
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
        var assignment = new SurveyAssignment
        {
            SurveyId = request.SurveyId,
            VillageId = request.VillageId,
            TargetCount = request.TargetCount,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Note = request.Note,
            Status = AssignmentStatus.ASSIGNED,
            CreatedAt = DateTime.UtcNow
        };

        _db.SurveyAssignments.Add(assignment);
        await _db.SaveChangesAsync();

        foreach (var uid in request.AssignedUserIds)
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
            a.Village?.Name ?? "Köy",
            a.TargetCount,
            completedCount,
            a.StartDate,
            a.EndDate,
            a.Note,
            a.Status.ToString(),
            viewedAt,
            users
        );
    }
}
