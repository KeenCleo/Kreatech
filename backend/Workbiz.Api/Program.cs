 using Scalar.AspNetCore;
 using Microsoft.EntityFrameworkCore; 
 using Workbiz.Api;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
var dbPath = Path.Combine(AppContext.BaseDirectory, "workbiz.db"); builder.Services.AddDbContext<WorkbizDbContext>(options => options.UseSqlite($"Data Source={dbPath}"));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.MapGet("/ping", () => "pong");
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");
app.MapPost("/usuarios", async (Usuario usuario, WorkbizDbContext db) => { db.Usuarios.Add(usuario); await db.SaveChangesAsync(); return Results.Created($"/usuarios/{usuario.Id}", usuario); }); app.MapGet("/usuarios", async (WorkbizDbContext db) => await db.Usuarios.ToListAsync());
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
