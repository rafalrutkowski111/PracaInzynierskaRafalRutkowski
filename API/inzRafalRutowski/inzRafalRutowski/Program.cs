using AutoMapper;
using inzRafalRutowski.Controllers;
using inzRafalRutowski.Data;
using inzRafalRutowski.Extensions;
using inzRafalRutowski.Identity;
using inzRafalRutowski.Mapper;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using static System.Net.WebRequestMethods;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Authentication
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));


//dotnet tool install -g Rnwood.Smtp4dev  --- intalacja
//smtp4dev --urls=http://127.0.0.1:5001   --- uruchomienie na innnym porcie

builder.Services
    .AddFluentEmail("default-sender@example.com") // Domyœlny nadawca
    .AddSmtpSender("localhost", 25); // smtp4dev lub inny serwer SMTP

builder.Services.AddAuthentication(options=>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = key,
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });
builder.Services.AddAuthorization();
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy(IdentityData.AdminUserPolicyName, p =>
//        p.RequireClaim(IdentityData.AdminUserClaimName, "True"));
//});
// end Authentication

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// autorization user for every controller
//builder.Services.AddControllers(options =>
//{
//    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
//    options.Filters.Add(new AuthorizeFilter(policy));
//});
builder.Services.AddControllers();

builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddTransient<ITestApiService, TestApiService>();
builder.Services.AddTransient<IEmployerService, EmployerService>();
builder.Services.AddTransient<IExperienceService, ExperienceService>();
builder.Services.AddTransient<ISpecializationService, SpecializationService>();
builder.Services.AddTransient<IEmployeeService, EmployeeService>();
builder.Services.AddTransient<IJobService, JobService>();
builder.Services.AddTransient<IJwtService, JwtService>();

// start mapper
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new inzRafalRutowski.Mapper.Mapper());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddMvc();
//end mapper

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy => policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins("http://localhost:3000")
    );
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
