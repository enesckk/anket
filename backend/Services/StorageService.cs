namespace SurveyAdmin.Api.Services;

public interface IStorageService
{
    Task<string> SaveFileAsync(byte[] fileBytes, string fileName, string contentType);
    Task<bool> DeleteFileAsync(string filePath);
    bool ValidateFile(byte[] fileBytes, string fileName, out string errorMessage);
}

public class LocalStorageService : IStorageService
{
    private readonly IWebHostEnvironment _env;
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".webp" };
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB Limit

    public LocalStorageService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public bool ValidateFile(byte[] fileBytes, string fileName, out string errorMessage)
    {
        errorMessage = string.Empty;

        if (fileBytes == null || fileBytes.Length == 0)
        {
            errorMessage = "Dosya boş olamaz.";
            return false;
        }

        if (fileBytes.Length > MaxFileSizeBytes)
        {
            errorMessage = "Dosya boyutu maksimum 5MB olabilir.";
            return false;
        }

        var ext = Path.GetExtension(fileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext))
        {
            errorMessage = "Geçersiz dosya biçimi. Yalnızca JPG, PNG ve WEBP formatları desteklenmektedir.";
            return false;
        }

        return true;
    }

    public async Task<string> SaveFileAsync(byte[] fileBytes, string fileName, string contentType)
    {
        if (!ValidateFile(fileBytes, fileName, out var error))
        {
            throw new ArgumentException(error);
        }

        var uploadsFolder = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var ext = Path.GetExtension(fileName).ToLowerInvariant();
        var safeFileName = $"{Guid.NewGuid()}{ext}";
        var fullPath = Path.Combine(uploadsFolder, safeFileName);

        await File.WriteAllBytesAsync(fullPath, fileBytes);

        return $"/uploads/{safeFileName}";
    }

    public Task<bool> DeleteFileAsync(string filePath)
    {
        if (string.IsNullOrEmpty(filePath)) return Task.FromResult(false);

        var relativeName = Path.GetFileName(filePath);
        var fullPath = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", relativeName);

        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
            return Task.FromResult(true);
        }

        return Task.FromResult(false);
    }
}
