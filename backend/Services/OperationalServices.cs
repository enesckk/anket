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

        List<Guid> recipientIds = request.RecipientUserIds?.Distinct().ToList() ?? new List<Guid>();
        if (!recipientIds.Any())
        {
            var senderRole = await _db.Users.Where(u => u.Id == senderId).Select(u => u.Role).FirstAsync();
            var recipientRole = senderRole == UserRole.ADMIN ? UserRole.FIELD_USER : UserRole.ADMIN;
            recipientIds = await _db.Users
                .Where(u => u.Role == recipientRole && u.IsActive)
                .Select(u => u.Id)
                .ToListAsync();
        }

        recipientIds = await _db.Users
            .Where(u => recipientIds.Contains(u.Id) && u.IsActive && u.Id != senderId)
            .Select(u => u.Id)
            .ToListAsync();
        if (!recipientIds.Any()) throw new ArgumentException("Mesaj için aktif bir alıcı bulunamadı.");

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
            m.Sender?.Role.ToString() ?? UserRole.ADMIN.ToString(),
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
    Task<UserDto?> UpdatePersonnelAsync(Guid userId, UpdateUserRequest request);
    Task<bool> DeletePersonnelAsync(Guid userId);
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
        var normalizedUsername = request.Username.Trim().ToLowerInvariant();
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();
        if (await _db.Users.AnyAsync(u => u.Username.ToLower() == normalizedUsername ||
            (!string.IsNullOrEmpty(normalizedEmail) && u.Email.ToLower() == normalizedEmail)))
            throw new ArgumentException("Kullanıcı adı veya e-posta zaten kayıtlı.");
        Enum.TryParse<UserRole>(request.Role, true, out var role);

        var user = new User
        {
            Username = normalizedUsername,
            Email = normalizedEmail,
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

    public async Task<UserDto?> UpdatePersonnelAsync(Guid userId, UpdateUserRequest request)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return null;
        var username = request.Username.Trim().ToLowerInvariant();
        var email = request.Email.Trim().ToLowerInvariant();
        if (await _db.Users.AnyAsync(u => u.Id != userId &&
            (u.Username.ToLower() == username || (!string.IsNullOrEmpty(email) && u.Email.ToLower() == email))))
            throw new ArgumentException("Kullanıcı adı veya e-posta zaten kayıtlı.");
        if (!Enum.TryParse<UserRole>(request.Role, true, out var role))
            throw new ArgumentException("Geçersiz kullanıcı rolü.");
        user.Username = username;
        user.Email = email;
        user.Phone = request.Phone.Trim();
        user.FullName = request.FullName.Trim();
        user.Role = role;
        if (!string.IsNullOrWhiteSpace(request.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        await _db.SaveChangesAsync();
        return new UserDto(user.Id, user.Username, user.Email, user.Phone, user.FullName, user.Role.ToString(), user.IsActive);
    }

    public async Task<bool> DeletePersonnelAsync(Guid userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user == null) return false;
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return true;
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
