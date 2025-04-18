using JetBrains.Annotations;
using Tapper;

namespace MyTurborepo.Apps.Api;

[PublicAPI]
[TranspilationSource]
public record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}