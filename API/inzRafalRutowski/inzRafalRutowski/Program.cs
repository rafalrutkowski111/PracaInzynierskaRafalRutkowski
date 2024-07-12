using AutoMapper;
using inzRafalRutowski.Data;
using inzRafalRutowski.Mapper;
using inzRafalRutowski.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

builder.Services.AddTransient<ITestApiService, TestApiService>();
builder.Services.AddTransient<IEmployerService, EmployerService>();
builder.Services.AddTransient<IExperienceService, ExperienceService>();
builder.Services.AddTransient<ISpecializationService, SpecializationService>();
builder.Services.AddTransient<IEmployeeService, EmployeeService>();




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
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
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

app.UseAuthorization();

app.MapControllers();

app.Run();
