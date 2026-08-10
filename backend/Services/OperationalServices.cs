using Microsoft.EntityFrameworkCore;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface IMessageService
{
    Task<MessageDto> CreateMessageAsync(CreateMessageRequest request, Guid senderId);
    Task<List<MessageDto>> GetMessagesForUserAsync(Guid userId);
    Task<List<MessageDto>> GetAllMessagesAsync();
    Task<bool> MarkMessageSeenAsync(Guid messageId, Guid userId);
}

public class MessageService : IMessageService
{
    private readonly SurveyDbContext _db;

    public MessageService(SurveyDbContext db)
    {
        _db = db;
    }

    public async Task<MessageDto> CreateMessageAsync(CreateMessageRequest request, Guid senderId)
    {
        var msg = new Message
        {
            Title = request.Title,
            Content = request.Content,
            SenderId = senderId,
            CreatedAt = DateTime.UtcNow
        };

        _db.Messages.Add(msg);
        await _db.SaveChangesAsync();

        List<Guid> recipientIds = request.RecipientUserIds ?? new List<Guid>();
        if (!recipientIds.Any())
        {
            // Send to ALL FIELD_USERs
            recipientIds = await _db.Users
                .Where(u => u.Role == UserRole.FIELD_USER && u.IsActive)
                .Select(u => u.Id)
                .ToListAsync();
        }

        foreach (var uid in recipientIds)
        {
            _db.MessageRecipients.Add(new MessageRecipient
            {
                MessageId = msg.Id,
                UserId = uid,
                DeliveredAt = DateTime.UtcNow,
                SeenAt = null
            });
        }

        await _db.SaveChangesAsync();

        var saved = await _db.Messages
            .Include(m => m.Sender)
            .Include(m => m.Recipients)
            .FirstAsync(m => m.Id == msg.Id);

        return MapToMessageDto(saved, null);
    }

    public async Task<List<MessageDto>> GetMessagesForUserAsync(Guid userId)
    {
        var messages = await _db.Messages
            .Include(m => m.Sender)
            .Include(m => m.Recipients)
            .Where(m => m.Recipients.Any(r => r.UserId == userId))
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return messages.Select(m => MapToMessageDto(m, userId)).ToList();
    }

    public async Task<List<MessageDto>> GetAllMessagesAsync()
    {
        var messages = await _db.Messages
            .Include(m => m.Sender)
            .Include(m => m.Recipients)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return messages.Select(m => MapToMessageDto(m, null)).ToList();
    }

    public async Task<bool> MarkMessageSeenAsync(Guid messageId, Guid userId)
    {
        var recipient = await _db.MessageRecipients
            .FirstOrDefaultAsync(r => r.MessageId == messageId && r.UserId == userId);

        if (recipient == null) return false;

        if (!recipient.SeenAt.HasValue)
        {
            recipient.SeenAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }

        return true;
    }

    private static MessageDto MapToMessageDto(Message m, Guid? currentUserId)
    {
        DateTime? seenAt = null;
        if (currentUserId.HasValue)
        {
            var r = m.Recipients.FirstOrDefault(x => x.UserId == currentUserId.Value);
            seenAt = r?.SeenAt;
        }
        else
        {
            seenAt = m.Recipients.FirstOrDefault(x => x.SeenAt.HasValue)?.SeenAt;
        }

        var totalRecipients = m.Recipients.Count;
        var seenCount = m.Recipients.Count(x => x.SeenAt.HasValue);

        return new MessageDto(
            m.Id,
            m.Title,
            m.Content,
            m.SenderId,
            m.Sender?.FullName ?? "Admin",
            m.CreatedAt,
            seenAt,
            totalRecipients,
            seenCount
        );
    }
}

public interface IPersonnelService
{
    Task<List<UserDto>> GetAllPersonnelAsync();
    Task<UserDto> CreatePersonnelAsync(CreateUserRequest request);
    Task<bool> ToggleUserStatusAsync(Guid userId);
}

public class PersonnelService : IPersonnelService
{
    private readonly SurveyDbContext _db;

    public PersonnelService(SurveyDbContext db)
    {
        _db = db;
    }

    public async Task<List<UserDto>> GetAllPersonnelAsync()
    {
        var users = await _db.Users.AsNoTracking().OrderBy(u => u.FullName).ToListAsync();
        return users.Select(u => new UserDto(u.Id, u.Username, u.Email, u.Phone, u.FullName, u.Role.ToString(), u.IsActive)).ToList();
    }

    public async Task<UserDto> CreatePersonnelAsync(CreateUserRequest request)
    {
        Enum.TryParse<UserRole>(request.Role, true, out var role);

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            Phone = request.Phone,
            FullName = request.FullName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = role,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return new UserDto(user.Id, user.Username, user.Email, user.Phone, user.FullName, user.Role.ToString(), user.IsActive);
    }

    public async Task<bool> ToggleUserStatusAsync(Guid userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return false;

        user.IsActive = !user.IsActive;
        await _db.SaveChangesAsync();
        return true;
    }
}
