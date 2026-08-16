# Multi-stage Dockerfile for ASP.NET Core Web API (.NET 9) with Linux Stability & Low-Memory Optimization

# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["SurveyAdmin.Api.csproj", "./"]
RUN dotnet restore "SurveyAdmin.Api.csproj"

COPY . .
RUN dotnet build "SurveyAdmin.Api.csproj" -c Release -o /app/build
RUN dotnet publish "SurveyAdmin.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime (Hardened with Native Font Libraries and Workstation GC for 512MB Free Tier)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Install native dependencies for QuestPDF/Skia font rendering to prevent Status 139 (SIGSEGV)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libfontconfig1 \
    libfreetype6 \
    libicu-dev \
    && rm -rf /var/lib/apt/lists/*

# Crucial memory optimizations for Render 512MB RAM instances
ENV DOTNET_gcServer=0
ENV DOTNET_GCConserveMemory=9
ENV DOTNET_EnableDiagnostics=0
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .

# Create uploads directory with write permissions
RUN mkdir -p /app/wwwroot/uploads

ENTRYPOINT ["dotnet", "SurveyAdmin.Api.dll"]
