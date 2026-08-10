using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Dtos;

// AUTH DTOS
public record LoginRequest(string UsernameOrPhone, string Password);
public record AuthResponse(string AccessToken, string RefreshToken, UserDto User);
public record RefreshTokenRequest(string RefreshToken);
public record UserDto(Guid Id, string Username, string Email, string Phone, string FullName, string Role, bool IsActive);

// SURVEY DTOS
public record SurveyDto(
    Guid Id,
    string Title,
    string Description,
    string Status,
    string Source,
    Guid CreatedByUserId,
    string CreatedByUserName,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    List<SurveySectionDto> Sections,
    List<SurveyQuestionDto> Questions
);

public record SurveySectionDto(Guid Id, string Title, int Order, List<SurveyQuestionDto> Questions);

public record SurveyQuestionDto(
    Guid Id,
    Guid? SectionId,
    string Title,
    string Description,
    string Type,
    bool IsRequired,
    int Order,
    Guid? ConditionSourceQuestionId,
    string? ConditionOperator,
    string? ConditionValue,
    double? MinValue,
    double? MaxValue,
    List<SurveyQuestionOptionDto> Options
);

public record SurveyQuestionOptionDto(Guid Id, string Label, string Value, int Order);

public record CreateSurveyRequest(string Title, string Description, string Source = "ADMIN");

public record CreateQuestionRequest(
    Guid? SectionId,
    string Title,
    string Description,
    string Type,
    bool IsRequired,
    int Order,
    Guid? ConditionSourceQuestionId,
    string? ConditionOperator,
    string? ConditionValue,
    List<CreateOptionRequest>? Options
);

public record CreateOptionRequest(string Label, string Value, int Order);

public record UpdateSurveyStatusRequest(string Status);

// ASSIGNMENT DTOS
public record AssignmentDto(
    Guid Id,
    Guid SurveyId,
    string SurveyTitle,
    Guid VillageId,
    string VillageName,
    int TargetCount,
    int CompletedCount,
    DateTime StartDate,
    DateTime EndDate,
    string Note,
    string Status,
    DateTime? ViewedAt,
    List<UserDto> AssignedUsers
);

public record CreateAssignmentRequest(
    Guid SurveyId,
    Guid VillageId,
    int TargetCount,
    DateTime StartDate,
    DateTime EndDate,
    string Note,
    List<Guid> AssignedUserIds
);

// SUBMISSION & SYNC DTOS
public record CreateSubmissionRequest(
    string ClientSubmissionId,
    Guid SurveyId,
    Guid? AssignmentId,
    Guid? VillageId,
    DateTime StartedAt,
    DateTime CompletedAt,
    double? Latitude,
    double? Longitude,
    double? Accuracy,
    string SyncSource,
    List<CreateAnswerRequest> Answers
);

public record CreateAnswerRequest(
    Guid QuestionId,
    string AnswerValue,
    string? FileBase64,
    string? FileName
);

public record SubmissionDto(
    Guid Id,
    string ClientSubmissionId,
    Guid SurveyId,
    string SurveyTitle,
    Guid? AssignmentId,
    Guid FieldUserId,
    string FieldUserName,
    Guid? VillageId,
    string VillageName,
    DateTime StartedAt,
    DateTime CompletedAt,
    DateTime SubmittedAt,
    double? Latitude,
    double? Longitude,
    double? Accuracy,
    string SyncSource,
    bool IsInvalid,
    List<AnswerDto> Answers
);

public record AnswerDto(Guid Id, Guid QuestionId, string QuestionTitle, string QuestionType, string AnswerValue, string? FilePath);

// REPORT DTOS
public record ReportFilterRequest(
    Guid? SurveyId,
    Guid? VillageId,
    Guid? FieldUserId,
    DateTime? StartDate,
    DateTime? EndDate
);

public record SurveyReportSummaryDto(
    Guid SurveyId,
    string SurveyTitle,
    int TotalSubmissions,
    int TotalValidSubmissions,
    int TotalInvalidSubmissions,
    List<QuestionReportDto> QuestionReports
);

public record QuestionReportDto(
    Guid QuestionId,
    string QuestionTitle,
    string QuestionType,
    int TotalAnswers,
    List<OptionCountDto>? OptionCounts,
    double? AverageValue,
    double? MinValue,
    double? MaxValue
);

public record OptionCountDto(string Label, int Count, double Percentage);

// MESSAGE DTOS
public record MessageDto(
    Guid Id,
    string Title,
    string Content,
    Guid SenderId,
    string SenderName,
    DateTime CreatedAt,
    DateTime? SeenAt,
    int TotalRecipients,
    int SeenCount
);

public record CreateMessageRequest(
    string Title,
    string Content,
    List<Guid>? RecipientUserIds
);

// PERSONNEL DTOS
public record CreateUserRequest(
    string Username,
    string Email,
    string Phone,
    string Password,
    string FullName,
    string Role
);
