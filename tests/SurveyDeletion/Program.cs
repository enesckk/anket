using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Entities;
using SurveyAdmin.Api.Services;

// Disposable relational database: this test cannot connect to production.
await using var connection = new SqliteConnection("Data Source=:memory:");
await connection.OpenAsync();
await using var db = new SurveyDbContext(new DbContextOptionsBuilder<SurveyDbContext>().UseSqlite(connection).Options);
await db.Database.EnsureCreatedAsync();
var admin = await db.Users.FirstAsync(u => u.Role == UserRole.ADMIN);
var field = await db.Users.FirstAsync(u => u.Role == UserRole.FIELD_USER);
var village = await db.Villages.FirstAsync();
async Task<Survey> CreateFixture(string name)
{
    var survey = new Survey { Title = name, CreatedByUserId = admin.Id, Status = SurveyStatus.ACTIVE };
    var section = new SurveySection { SurveyId = survey.Id, Title = "Bölüm" };
    var question = new SurveyQuestion { SurveyId = survey.Id, SectionId = section.Id, Title = "Soru", Type = QuestionType.SINGLE_CHOICE };
    var option = new SurveyQuestionOption { QuestionId = question.Id, Label = "Evet", Value = "yes" };
    var assignment = new SurveyAssignment { SurveyId = survey.Id, VillageId = village.Id };
    var assignedUser = new SurveyAssignmentUser { AssignmentId = assignment.Id, UserId = field.Id };
    var submission = new SurveySubmission { SurveyId = survey.Id, AssignmentId = assignment.Id, FieldUserId = field.Id, VillageId = village.Id, ClientSubmissionId = Guid.NewGuid().ToString() };
    var answer = new SurveyAnswer { SubmissionId = submission.Id, QuestionId = question.Id, AnswerValue = "yes" };
    db.AddRange(survey, section, question, option, assignment, assignedUser, submission, answer);
    await db.SaveChangesAsync();
    db.ChangeTracker.Clear();
    return survey;
}
void Check(bool condition, string message) { if (!condition) throw new Exception(message); }
var delete = await CreateFixture("Silinecek anket");
var keep = await CreateFixture("Korunacak anket");
var usersBefore = await db.Users.CountAsync();
var villagesBefore = await db.Villages.CountAsync();
var service = new SurveyService(db);
Check(await service.DeleteSurveyAsync(delete.Id, true), "Permanent deletion did not succeed.");
db.ChangeTracker.Clear();
Check(!await db.Surveys.AnyAsync(s => s.Id == delete.Id), "Deleted survey still exists.");
Check(!await db.SurveySubmissions.AnyAsync(s => s.SurveyId == delete.Id), "Deleted submissions remain.");
Check(!await db.SurveyAssignments.AnyAsync(s => s.SurveyId == delete.Id), "Deleted assignments remain.");
Check(!await db.SurveyQuestions.AnyAsync(s => s.SurveyId == delete.Id), "Deleted questions remain.");
Check(!await db.SurveySections.AnyAsync(s => s.SurveyId == delete.Id), "Deleted sections remain.");
Check(await db.SurveyAnswers.CountAsync() == 1, "Answers from another survey were affected.");
Check(await db.SurveyQuestionOptions.CountAsync() == 1, "Options from another survey were affected.");
Check(await db.Surveys.AnyAsync(s => s.Id == keep.Id), "Another survey was deleted.");
Check(await db.Users.CountAsync() == usersBefore, "Personnel were affected.");
Check(await db.Villages.CountAsync() == villagesBefore, "Regions were affected.");
Check(!await service.DeleteSurveyAsync(delete.Id, true), "Repeated deletion should report not found.");
Check(await service.DeleteSurveyAsync(keep.Id), "Legacy delete failed.");
Check((await db.Surveys.FindAsync(keep.Id))!.Status == SurveyStatus.CLOSED, "Legacy clients must retain close behavior.");
Check(await db.SurveySubmissions.AnyAsync(s => s.SurveyId == keep.Id), "Legacy close must preserve answers.");
Check(await service.DeleteSurveyAsync(keep.Id, true), "Closed surveys must also support permanent deletion.");
Check(!await db.SurveyAnswers.AnyAsync(), "Answers were orphaned.");
Check(!await db.SurveyQuestionOptions.AnyAsync(), "Options were orphaned.");
Console.WriteLine("Relational SQLite deletion tests passed: populated survey graph, isolation, closed surveys, legacy compatibility and repeated deletion.");
