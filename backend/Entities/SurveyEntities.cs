namespace SurveyAdmin.Api.Entities;

public enum UserRole
{
    ADMIN,
    FIELD_USER
}

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.FIELD_USER;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<SurveyAssignmentUser> AssignmentUsers { get; set; } = new List<SurveyAssignmentUser>();
    public ICollection<SurveySubmission> Submissions { get; set; } = new List<SurveySubmission>();
    public ICollection<MessageRecipient> MessageRecipients { get; set; } = new List<MessageRecipient>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}

public class Village
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum SurveyStatus
{
    DRAFT,
    ACTIVE,
    CLOSED
}

public enum SurveySource
{
    ADMIN,
    FIELD_USER
}

public class Survey
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public SurveyStatus Status { get; set; } = SurveyStatus.DRAFT;
    public SurveySource Source { get; set; } = SurveySource.ADMIN;
    public Guid CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<SurveySection> Sections { get; set; } = new List<SurveySection>();
    public ICollection<SurveyQuestion> Questions { get; set; } = new List<SurveyQuestion>();
    public ICollection<SurveyAssignment> Assignments { get; set; } = new List<SurveyAssignment>();
    public ICollection<SurveySubmission> Submissions { get; set; } = new List<SurveySubmission>();
}

public class SurveySection
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SurveyId { get; set; }
    public Survey? Survey { get; set; }
    public string Title { get; set; } = string.Empty;
    public int Order { get; set; }

    public ICollection<SurveyQuestion> Questions { get; set; } = new List<SurveyQuestion>();
}

public enum QuestionType
{
    TEXT,
    NUMBER,
    YES_NO,
    SINGLE_CHOICE,
    MULTIPLE_CHOICE,
    DATE,
    PHOTO,
    LOCATION
}

public enum ConditionOperator
{
    EQUALS,
    NOT_EQUALS
}

public class SurveyQuestion
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SurveyId { get; set; }
    public Survey? Survey { get; set; }
    public Guid? SectionId { get; set; }
    public SurveySection? Section { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public QuestionType Type { get; set; } = QuestionType.TEXT;
    public bool IsRequired { get; set; } = true;
    public int Order { get; set; }

    // Conditional Logic
    public Guid? ConditionSourceQuestionId { get; set; }
    public ConditionOperator? ConditionOperator { get; set; }
    public string? ConditionValue { get; set; }

    public double? MinValue { get; set; }
    public double? MaxValue { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<SurveyQuestionOption> Options { get; set; } = new List<SurveyQuestionOption>();
}

public class SurveyQuestionOption
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid QuestionId { get; set; }
    public SurveyQuestion? Question { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public int Order { get; set; }
    public bool IsActive { get; set; } = true;
}
