using finfast_backend.Models;
using Microsoft.EntityFrameworkCore;
using finfast_backend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PruebaTecnicaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("cs")));

builder.Services.AddScoped<IDataRepository, DataRepository>();
builder.Services.AddSwaggerGen();


builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", b =>
    {
        b.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Prueba Tecnica Finfast");
    c.RoutePrefix = string.Empty;
});
app.UseCors("AllowAnyOrigin");
app.MapControllers();

app.Run();
