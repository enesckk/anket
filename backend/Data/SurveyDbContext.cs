using Microsoft.EntityFrameworkCore;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Data;

public class SurveyDbContext : DbContext
{
    public SurveyDbContext(DbContextOptions<SurveyDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Village> Villages => Set<Village>();
    public DbSet<Survey> Surveys => Set<Survey>();
    public DbSet<SurveySection> SurveySections => Set<SurveySection>();
    public DbSet<SurveyQuestion> SurveyQuestions => Set<SurveyQuestion>();
    public DbSet<SurveyQuestionOption> SurveyQuestionOptions => Set<SurveyQuestionOption>();
    public DbSet<SurveyAssignment> SurveyAssignments => Set<SurveyAssignment>();
    public DbSet<SurveyAssignmentUser> SurveyAssignmentUsers => Set<SurveyAssignmentUser>();
    public DbSet<SurveySubmission> SurveySubmissions => Set<SurveySubmission>();
    public DbSet<SurveyAnswer> SurveyAnswers => Set<SurveyAnswer>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<MessageRecipient> MessageRecipients => Set<MessageRecipient>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique Constraint for Idempotency
        modelBuilder.Entity<SurveySubmission>()
            .HasIndex(s => s.ClientSubmissionId)
            .IsUnique();

        // Index on Usernames & Phones
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Phone);

        // Seed Data
        var adminId = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var fieldUserId = Guid.Parse("22222222-2222-2222-2222-222222222222");

        var adminUser = new User
        {
            Id = adminId,
            Username = "admin",
            Phone = "05000000000",
            FullName = "Sistem Yöneticisi",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            Role = UserRole.ADMIN,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        var fieldUser = new User
        {
            Id = fieldUserId,
            Username = "saha",
            Phone = "05551002030",
            FullName = "Saha Yöneticisi",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Saha123!"),
            Role = UserRole.FIELD_USER,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        modelBuilder.Entity<User>().HasData(adminUser, fieldUser);

        var v1Id = Guid.Parse("33333333-3333-3333-3333-333333333331");
        var v2Id = Guid.Parse("33333333-3333-3333-3333-333333333332");
        var v3Id = Guid.Parse("33333333-3333-3333-3333-333333333333");

        modelBuilder.Entity<Village>().HasData(
            new Village { Id = v1Id, Name = "Sinan Köyü", Region = "Güneydoğu Anadolu", IsActive = true },
            new Village { Id = v2Id, Name = "Merkez Mahalle", Region = "Güneydoğu Anadolu", IsActive = true },
            new Village { Id = v3Id, Name = "Yeşilyurt", Region = "Güneydoğu Anadolu", IsActive = true }
        );

        var survey1Id = Guid.Parse("44444444-4444-4444-4444-444444444441");
        modelBuilder.Entity<Survey>().HasData(
            new Survey
            {
                Id = survey1Id,
                Title = "Tarımsal Üretici İhtiyaç Anketi",
                Description = "Tarımsal destek, sulama ve ekipman durum tespiti.",
                Status = SurveyStatus.ACTIVE,
                Source = SurveySource.ADMIN,
                CreatedByUserId = adminId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );

        var sec1Id = Guid.Parse("55555555-5555-5555-5555-555555555551");
        var sec2Id = Guid.Parse("55555555-5555-5555-5555-555555555552");

        modelBuilder.Entity<SurveySection>().HasData(
            new SurveySection { Id = sec1Id, SurveyId = survey1Id, Title = "Kişisel Bilgiler", Order = 1 },
            new SurveySection { Id = sec2Id, SurveyId = survey1Id, Title = "Arazi Bilgileri", Order = 2 }
        );

        var q1Id = Guid.Parse("66666666-6666-6666-6666-666666666661");
        var q2Id = Guid.Parse("66666666-6666-6666-6666-666666666662");

        modelBuilder.Entity<SurveyQuestion>().HasData(
            new SurveyQuestion { Id = q1Id, SurveyId = survey1Id, SectionId = sec1Id, Title = "Ad Soyad", Type = QuestionType.TEXT, IsRequired = true, Order = 1 },
            new SurveyQuestion { Id = q2Id, SurveyId = survey1Id, SectionId = sec2Id, Title = "Araziniz Var Mı?", Type = QuestionType.YES_NO, IsRequired = true, Order = 2 }
        );

        var assignId = Guid.Parse("77777777-7777-7777-7777-777777777771");
        modelBuilder.Entity<SurveyAssignment>().HasData(
            new SurveyAssignment
            {
                Id = assignId,
                SurveyId = survey1Id,
                VillageId = v1Id,
                TargetCount = 50,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(14),
                Note = "Sinan Köyü üreticileriyle yüz yüze görüşünüz.",
                Status = AssignmentStatus.ASSIGNED,
                CreatedAt = DateTime.UtcNow
            }
        );

        modelBuilder.Entity<SurveyAssignmentUser>().HasData(
            new SurveyAssignmentUser { Id = Guid.Parse("88888888-8888-8888-8888-888888888881"), AssignmentId = assignId, UserId = fieldUserId, ViewedAt = null }
        );
    }
}
