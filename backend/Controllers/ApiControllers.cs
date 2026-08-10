using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Services;

namespace SurveyAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var res = await _authService.LoginAsync(request);
            return Ok(res);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var res = await _authService.RefreshTokenAsync(request.RefreshToken);
            return Ok(res);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SurveysController : ControllerBase
{
    private readonly ISurveyService _surveyService;

    public SurveysController(ISurveyService surveyService)
    {
        _surveyService = surveyService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status, [FromQuery] string? source)
    {
        var surveys = await _surveyService.GetAllSurveysAsync(status, source);
        return Ok(surveys);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var survey = await _surveyService.GetSurveyByIdAsync(id);
        if (survey == null) return NotFound();
        return Ok(survey);
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN,FIELD_USER")]
    public async Task<IActionResult> Create([FromBody] CreateSurveyRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var survey = await _surveyService.CreateSurveyAsync(request, userId);
        return Ok(survey);
    }

    [HttpPost("{id}/clone")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Clone(Guid id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var cloned = await _surveyService.CloneSurveyAsync(id, userId);
        if (cloned == null) return NotFound();
        return Ok(cloned);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateSurveyStatusRequest request)
    {
        var updated = await _surveyService.UpdateSurveyStatusAsync(id, request.Status);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpPost("{id}/questions")]
    [Authorize(Roles = "ADMIN,FIELD_USER")]
    public async Task<IActionResult> AddQuestion(Guid id, [FromBody] CreateQuestionRequest request)
    {
        var q = await _surveyService.AddQuestionAsync(id, request);
        return Ok(q);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var ok = await _surveyService.DeleteSurveyAsync(id);
        if (!ok) return NotFound();
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentService _assignmentService;

    public AssignmentsController(IAssignmentService assignmentService)
    {
        _assignmentService = assignmentService;
    }

    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAll()
    {
        var list = await _assignmentService.GetAllAssignmentsAsync();
        return Ok(list);
    }

    [HttpGet("my-tasks")]
    public async Task<IActionResult> GetMyTasks()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var tasks = await _assignmentService.GetAssignmentsForUserAsync(userId);
        return Ok(tasks);
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create([FromBody] CreateAssignmentRequest request)
    {
        var created = await _assignmentService.CreateAssignmentAsync(request);
        return Ok(created);
    }

    [HttpPost("{id}/viewed")]
    public async Task<IActionResult> MarkViewed(Guid id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var ok = await _assignmentService.MarkAssignmentViewedAsync(id, userId);
        if (!ok) return NotFound();
        return Ok(new { success = true });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SubmissionsController : ControllerBase
{
    private readonly ISubmissionService _submissionService;

    public SubmissionsController(ISubmissionService submissionService)
    {
        _submissionService = submissionService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSubmissionRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var res = await _submissionService.CreateSubmissionAsync(request, userId);
        return Ok(res);
    }

    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAll([FromQuery] Guid? surveyId, [FromQuery] Guid? villageId, [FromQuery] Guid? fieldUserId, [FromQuery] bool includeInvalid = false)
    {
        var list = await _submissionService.GetSubmissionsAsync(surveyId, villageId, fieldUserId, includeInvalid);
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var res = await _submissionService.GetSubmissionByIdAsync(id);
        if (res == null) return NotFound();
        return Ok(res);
    }

    [HttpPost("{id}/toggle-invalid")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> ToggleInvalid(Guid id)
    {
        var adminId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var ok = await _submissionService.ToggleInvalidSubmissionAsync(id, adminId);
        if (!ok) return NotFound();
        return Ok(new { success = true });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class ReportsController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportsController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpPost("summary")]
    public async Task<IActionResult> GetSummary([FromBody] ReportFilterRequest filter)
    {
        var res = await _reportService.GetSurveyReportAsync(filter);
        return Ok(res);
    }

    [HttpPost("excel")]
    public async Task<IActionResult> ExportExcel([FromBody] ReportFilterRequest filter)
    {
        var bytes = await _reportService.ExportExcelReportAsync(filter);
        return File(bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "SurveyReport.xlsx");
    }

    [HttpPost("pdf")]
    public async Task<IActionResult> ExportPdf([FromBody] ReportFilterRequest filter)
    {
        var bytes = await _reportService.ExportPdfReportAsync(filter);
        return File(bytes, "application/pdf", "SurveyReport.pdf");
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessagesController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create([FromBody] CreateMessageRequest request)
    {
        var senderId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var msg = await _messageService.CreateMessageAsync(request, senderId);
        return Ok(msg);
    }

    [HttpGet("my-messages")]
    public async Task<IActionResult> GetMyMessages()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var list = await _messageService.GetMessagesForUserAsync(userId);
        return Ok(list);
    }

    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAll()
    {
        var list = await _messageService.GetAllMessagesAsync();
        return Ok(list);
    }

    [HttpPost("{id}/seen")]
    public async Task<IActionResult> MarkSeen(Guid id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var ok = await _messageService.MarkMessageSeenAsync(id, userId);
        if (!ok) return NotFound();
        return Ok(new { success = true });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class PersonnelController : ControllerBase
{
    private readonly IPersonnelService _personnelService;

    public PersonnelController(IPersonnelService personnelService)
    {
        _personnelService = personnelService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _personnelService.GetAllPersonnelAsync();
        return Ok(list);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequest request)
    {
        var user = await _personnelService.CreatePersonnelAsync(request);
        return Ok(user);
    }

    [HttpPost("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(Guid id)
    {
        var ok = await _personnelService.ToggleUserStatusAsync(id);
        if (!ok) return NotFound();
        return Ok(new { success = true });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SyncController : ControllerBase
{
    private readonly ISubmissionService _submissionService;
    private readonly IAssignmentService _assignmentService;
    private readonly IMessageService _messageService;

    public SyncController(ISubmissionService submissionService, IAssignmentService assignmentService, IMessageService messageService)
    {
        _submissionService = submissionService;
        _assignmentService = assignmentService;
        _messageService = messageService;
    }

    [HttpPost("batch")]
    public async Task<IActionResult> BatchSync([FromBody] BatchSyncRequest request)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var syncedSubmissionIds = new List<string>();

        if (request.Submissions != null)
        {
            foreach (var sub in request.Submissions)
            {
                var res = await _submissionService.CreateSubmissionAsync(sub, userId);
                syncedSubmissionIds.Add(res.ClientSubmissionId);
            }
        }

        if (request.ViewedAssignmentIds != null)
        {
            foreach (var aid in request.ViewedAssignmentIds)
            {
                await _assignmentService.MarkAssignmentViewedAsync(aid, userId);
            }
        }

        if (request.SeenMessageIds != null)
        {
            foreach (var mid in request.SeenMessageIds)
            {
                await _messageService.MarkMessageSeenAsync(mid, userId);
            }
        }

        return Ok(new BatchSyncResponse(syncedSubmissionIds));
    }
}

public record BatchSyncRequest(
    List<CreateSubmissionRequest>? Submissions,
    List<Guid>? ViewedAssignmentIds,
    List<Guid>? SeenMessageIds
);

public record BatchSyncResponse(List<string> SyncedSubmissionIds);
