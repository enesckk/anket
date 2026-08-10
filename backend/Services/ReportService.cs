using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SurveyAdmin.Api.Data;
using SurveyAdmin.Api.Dtos;
using SurveyAdmin.Api.Entities;

namespace SurveyAdmin.Api.Services;

public interface IReportService
{
    Task<SurveyReportSummaryDto> GetSurveyReportAsync(ReportFilterRequest filter);
    Task<byte[]> ExportExcelReportAsync(ReportFilterRequest filter);
    Task<byte[]> ExportPdfReportAsync(ReportFilterRequest filter);
}

public class ReportService : IReportService
{
    private readonly SurveyDbContext _db;

    public ReportService(SurveyDbContext db)
    {
        _db = db;
        QuestPDF.Settings.License = LicenseType.Community;
    }

    public async Task<SurveyReportSummaryDto> GetSurveyReportAsync(ReportFilterRequest filter)
    {
        var surveyId = filter.SurveyId ?? (await _db.Surveys.Select(s => s.Id).FirstOrDefaultAsync());
        var survey = await _db.Surveys
            .Include(s => s.Questions)
                .ThenInclude(q => q.Options)
            .FirstOrDefaultAsync(s => s.Id == surveyId);

        if (survey == null)
        {
            return new SurveyReportSummaryDto(Guid.Empty, "Anket Bulunamadı", 0, 0, 0, new List<QuestionReportDto>());
        }

        var submissionsQuery = _db.SurveySubmissions
            .Include(s => s.Answers)
            .Where(s => s.SurveyId == surveyId);

        if (filter.VillageId.HasValue) submissionsQuery = submissionsQuery.Where(s => s.VillageId == filter.VillageId.Value);
        if (filter.FieldUserId.HasValue) submissionsQuery = submissionsQuery.Where(s => s.FieldUserId == filter.FieldUserId.Value);
        if (filter.StartDate.HasValue) submissionsQuery = submissionsQuery.Where(s => s.SubmittedAt >= filter.StartDate.Value);
        if (filter.EndDate.HasValue) submissionsQuery = submissionsQuery.Where(s => s.SubmittedAt <= filter.EndDate.Value);

        var submissions = await submissionsQuery.ToListAsync();
        var total = submissions.Count;
        var valid = submissions.Count(s => !s.IsInvalid);
        var invalid = total - valid;

        var validSubmissions = submissions.Where(s => !s.IsInvalid).ToList();
        var qReports = new List<QuestionReportDto>();

        foreach (var q in survey.Questions.OrderBy(x => x.Order))
        {
            var qAnswers = validSubmissions
                .SelectMany(s => s.Answers)
                .Where(a => a.QuestionId == q.Id && !string.IsNullOrEmpty(a.AnswerValue))
                .ToList();

            int qTotal = qAnswers.Count;

            if (q.Type == QuestionType.SINGLE_CHOICE || q.Type == QuestionType.YES_NO || q.Type == QuestionType.MULTIPLE_CHOICE)
            {
                var optionCounts = new List<OptionCountDto>();
                var allOptions = q.Options.Select(o => o.Label).ToList();

                if (q.Type == QuestionType.YES_NO && !allOptions.Any())
                {
                    allOptions = new List<string> { "Evet", "Hayır" };
                }

                foreach (var opt in allOptions)
                {
                    int cnt = 0;
                    if (q.Type == QuestionType.MULTIPLE_CHOICE)
                    {
                        cnt = qAnswers.Count(a => a.AnswerValue.Contains(opt, StringComparison.OrdinalIgnoreCase));
                    }
                    else
                    {
                        cnt = qAnswers.Count(a => a.AnswerValue.Equals(opt, StringComparison.OrdinalIgnoreCase));
                    }

                    double pct = qTotal > 0 ? Math.Round((double)cnt / qTotal * 100, 1) : 0;
                    optionCounts.Add(new OptionCountDto(opt, cnt, pct));
                }

                qReports.Add(new QuestionReportDto(q.Id, q.Title, q.Type.ToString(), qTotal, optionCounts, null, null, null));
            }
            else if (q.Type == QuestionType.NUMBER)
            {
                var numValues = qAnswers
                    .Select(a => double.TryParse(a.AnswerValue, out var val) ? val : (double?)null)
                    .Where(val => val.HasValue)
                    .Select(val => val!.Value)
                    .ToList();

                double? avg = numValues.Any() ? Math.Round(numValues.Average(), 2) : null;
                double? min = numValues.Any() ? numValues.Min() : null;
                double? max = numValues.Any() ? numValues.Max() : null;

                qReports.Add(new QuestionReportDto(q.Id, q.Title, q.Type.ToString(), qTotal, null, avg, min, max));
            }
            else
            {
                qReports.Add(new QuestionReportDto(q.Id, q.Title, q.Type.ToString(), qTotal, null, null, null, null));
            }
        }

        return new SurveyReportSummaryDto(survey.Id, survey.Title, total, valid, invalid, qReports);
    }

    public async Task<byte[]> ExportExcelReportAsync(ReportFilterRequest filter)
    {
        var surveyId = filter.SurveyId ?? (await _db.Surveys.Select(s => s.Id).FirstOrDefaultAsync());
        var survey = await _db.Surveys
            .Include(s => s.Questions)
            .FirstOrDefaultAsync(s => s.Id == surveyId);

        var submissionsQuery = _db.SurveySubmissions
            .Include(s => s.FieldUser)
            .Include(s => s.Village)
            .Include(s => s.Answers)
            .Where(s => s.SurveyId == surveyId && !s.IsInvalid);

        if (filter.VillageId.HasValue) submissionsQuery = submissionsQuery.Where(s => s.VillageId == filter.VillageId.Value);
        if (filter.FieldUserId.HasValue) submissionsQuery = submissionsQuery.Where(s => s.FieldUserId == filter.FieldUserId.Value);

        var submissions = await submissionsQuery.OrderByDescending(s => s.SubmittedAt).ToListAsync();
        var questions = survey?.Questions.OrderBy(q => q.Order).ToList() ?? new List<SurveyQuestion>();

        using var workbook = new XLWorkbook();
        var worksheet = workbook.Worksheets.Add("Anket Yanıtları");

        // Headers
        int col = 1;
        worksheet.Cell(1, col++).Value = "Tarih";
        worksheet.Cell(1, col++).Value = "Köy / Bölge";
        worksheet.Cell(1, col++).Value = "Saha Personeli";

        foreach (var q in questions)
        {
            worksheet.Cell(1, col++).Value = SanitizeFormula(q.Title);
        }

        worksheet.Cell(1, col++).Value = "Enlem (Lat)";
        worksheet.Cell(1, col++).Value = "Boylam (Lng)";
        worksheet.Cell(1, col++).Value = "Hassasiyet (m)";

        // Style Headers
        var headerRange = worksheet.Range(1, 1, 1, col - 1);
        headerRange.Style.Font.Bold = true;
        headerRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#0059b5");
        headerRange.Style.Font.FontColor = XLColor.White;

        // Data Rows
        int row = 2;
        foreach (var sub in submissions)
        {
            col = 1;
            worksheet.Cell(row, col++).Value = sub.SubmittedAt.ToString("dd.MM.yyyy HH:mm");
            worksheet.Cell(row, col++).Value = SanitizeFormula(sub.Village?.Name ?? "-");
            worksheet.Cell(row, col++).Value = SanitizeFormula(sub.FieldUser?.FullName ?? "-");

            foreach (var q in questions)
            {
                var ans = sub.Answers.FirstOrDefault(a => a.QuestionId == q.Id);
                var val = ans?.AnswerValue ?? "-";
                if (!string.IsNullOrEmpty(ans?.FilePath))
                {
                    val += $" (Foto: {ans.FilePath})";
                }
                worksheet.Cell(row, col++).Value = SanitizeFormula(val);
            }

            worksheet.Cell(row, col++).Value = sub.Latitude?.ToString("F4") ?? "-";
            worksheet.Cell(row, col++).Value = sub.Longitude?.ToString("F4") ?? "-";
            worksheet.Cell(row, col++).Value = sub.Accuracy?.ToString("F1") ?? "-";
            row++;
        }

        worksheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }

    public async Task<byte[]> ExportPdfReportAsync(ReportFilterRequest filter)
    {
        var summary = await GetSurveyReportAsync(filter);

        var pdfDoc = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(30);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontFamily("Arial").FontSize(10));

                page.Header().Row(row =>
                {
                    row.RelativeItem().Column(col =>
                    {
                        col.Item().Text("SurveyAdmin Pro Intelligence").FontSize(16).Bold().FontColor("#0059b5");
                        col.Item().Text($"Anket Raporu: {summary.SurveyTitle}").FontSize(12).SemiBold();
                    });
                    row.ConstantItem(100).AlignRight().Text($"Tarih: {DateTime.Now:dd.MM.yyyy}").FontSize(9).FontColor(Colors.Grey.Medium);
                });

                page.Content().PaddingVertical(20).Column(col =>
                {
                    // Summary KPI Cards
                    col.Item().Row(r =>
                    {
                        r.RelativeItem().Border(1).BorderColor("#e5e5ea").Padding(10).Column(c =>
                        {
                            c.Item().Text("Toplam Yanıt").FontSize(9).FontColor(Colors.Grey.Darken1);
                            c.Item().Text($"{summary.TotalSubmissions}").FontSize(18).Bold().FontColor("#0059b5");
                        });
                        r.ConstantItem(10);
                        r.RelativeItem().Border(1).BorderColor("#e5e5ea").Padding(10).Column(c =>
                        {
                            c.Item().Text("Geçerli Yanıt").FontSize(9).FontColor(Colors.Grey.Darken1);
                            c.Item().Text($"{summary.TotalValidSubmissions}").FontSize(18).Bold().FontColor("#248a3d");
                        });
                        r.ConstantItem(10);
                        r.RelativeItem().Border(1).BorderColor("#e5e5ea").Padding(10).Column(c =>
                        {
                            c.Item().Text("Geçersiz Sayılan").FontSize(9).FontColor(Colors.Grey.Darken1);
                            c.Item().Text($"{summary.TotalInvalidSubmissions}").FontSize(18).Bold().FontColor("#d70015");
                        });
                    });

                    col.Item().PaddingVertical(15).LineHorizontal(1).LineColor("#e5e5ea");

                    // Question Summaries
                    foreach (var q in summary.QuestionReports)
                    {
                        col.Item().PaddingBottom(15).Column(qc =>
                        {
                            qc.Item().Text(q.QuestionTitle).FontSize(11).Bold().FontColor("#1a1c1d");
                            qc.Item().Text($"Toplam Cevap: {q.TotalAnswers}").FontSize(9).FontColor(Colors.Grey.Medium);

                            if (q.OptionCounts != null && q.OptionCounts.Any())
                            {
                                qc.Item().PaddingTop(5).Table(tbl =>
                                {
                                    tbl.ColumnsDefinition(cd =>
                                    {
                                        cd.RelativeColumn(3);
                                        cd.RelativeColumn(1);
                                        cd.RelativeColumn(1);
                                    });

                                    foreach (var opt in q.OptionCounts)
                                    {
                                        tbl.Cell().BorderBottom(1).BorderColor("#f0f0f2").Padding(4).Text(opt.Label).FontSize(9);
                                        tbl.Cell().BorderBottom(1).BorderColor("#f0f0f2").Padding(4).Text($"{opt.Count} Adet").FontSize(9);
                                        tbl.Cell().BorderBottom(1).BorderColor("#f0f0f2").Padding(4).Text($"%{opt.Percentage}").FontSize(9).Bold().FontColor("#0059b5");
                                    }
                                });
                            }
                            else if (q.AverageValue.HasValue)
                            {
                                qc.Item().PaddingTop(4).Text($"Ortalama: {q.AverageValue} | Min: {q.MinValue} | Max: {q.MaxValue}").FontSize(9).SemiBold();
                            }
                        });
                    }
                });

                page.Footer().AlignCenter().Text(x =>
                {
                    x.Span("Sayfa ");
                    x.CurrentPageNumber();
                    x.Span(" / ");
                    x.TotalPages();
                });
            });
        });

        return pdfDoc.GeneratePdf();
    }

    private static string SanitizeFormula(string value)
    {
        if (string.IsNullOrEmpty(value)) return string.Empty;
        if (value.StartsWith("=") || value.StartsWith("+") || value.StartsWith("-") || value.StartsWith("@"))
        {
            return "'" + value;
        }
        return value;
    }
}
