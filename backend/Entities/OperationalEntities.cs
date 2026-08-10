namespace SurveyAdmin.Api.Entities;

public enum AssignmentStatus
{
    ASSIGNED,
    VIEWED,
    IN_PROGRESS,
    COMPLETED
}

public class SurveyAssignment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SurveyId { get; set; }
    public Survey? Survey { get; set; }
    public Guid VillageId { get; set; }
    public Village? Village { get; set; }
    public int TargetCount { get; set; } = 100;
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
    public DateTime EndDate { get; set; } = DateTime.UtcNow.AddDays(14);
    public string Note { get; set; } = string.Empty;
    public AssignmentStatus Status { get; set; } = AssignmentStatus.ASSIGNED;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<SurveyAssignmentUser> AssignedUsers { get; set; } = new List<SurveyAssignmentUser>();
    public ICollection<SurveySubmission> Submissions { get; set; } = new List<SurveySubmission>();
}

public class SurveyAssignmentUser
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AssignmentId { get; set; }
    public SurveyAssignment? Assignment { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public DateTime? ViewedAt { get; set; }
}

public enum SyncSource
{
    ONLINE,
    OFFLINE_SYNC
}

public class SurveySubmission
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ClientSubmissionId { get; set; } = string.Empty; // Unique GUID for Idempotency
    public Guid SurveyId { get; set; }
    public Survey? Survey { get; set; }
    public Guid? AssignmentId { get; set; }
    public SurveyAssignment? Assignment { get; set; }
    public Guid FieldUserId { get; set; }
    public User? FieldUser { get; set; }
    public Guid? VillageId { get; set; }
    public Village? Village { get; set; }

    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public double? Accuracy { get; set; }

    public SyncSource SyncSource { get; set; } = SyncSource.ONLINE;
    public bool IsInvalid { get; set; } = false;
    public DateTime? InvalidatedAt { get; set; }
    public Guid? InvalidatedByUserId { get; set; }

    public ICollection<SurveyAnswer> Answers { get; set; } = new List<SurveyAnswer>();
}

public class SurveyAnswer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SubmissionId { get; set; }
    public SurveySubmission? Submission { get; set; }
    public Guid QuestionId { get; set; }
    public SurveyQuestion? Question { get; set; }
    public string AnswerValue { get; set; } = string.Empty;
    public string? FilePath { get; set; }
}

public class Message
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public Guid SenderId { get; set; }
    public User? Sender { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<MessageRecipient> Recipients { get; set; } = new List<MessageRecipient>();
}

public class MessageRecipient
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MessageId { get; set; }
    public Message? Message { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public DateTime? SeenAt { get; set; }
}

public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive => RevokedAt == null && ExpiresAt > DateTime.UtcNow;
}
