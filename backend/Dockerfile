# Multi-stage Dockerfile for ASP.NET Core Web API (.NET 9)

# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["SurveyAdmin.Api.csproj", "./"]
RUN dotnet restore "SurveyAdmin.Api.csproj"

COPY . .
RUN dotnet build "SurveyAdmin.Api.csproj" -c Release -o /app/build
RUN dotnet publish "SurveyAdmin.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .

# Create uploads directory with write permissions
RUN mkdir -p /app/wwwroot/uploads

ENTRYPOINT ["dotnet", "SurveyAdmin.Api.dll"]
