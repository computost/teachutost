using Microsoft.AspNetCore.SignalR;

namespace MyTurborepo.Apps.Api;

public class WeatherForecastService(IHubContext<WeatherForecastHub, IWeatherForecastClient> hubContext) : BackgroundService
{
    public static IReadOnlyCollection<string> Summaries { get; } = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using PeriodicTimer timer = new(TimeSpan.FromSeconds(30));

        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await hubContext.Clients.All.WeatherForecastUpdated(new WeatherForecast
                (
                    DateTime.Now,
                    Random.Shared.Next(-20, 55),
                    Summaries.ElementAt(Random.Shared.Next(Summaries.Count))
                ));
            }
        }
        catch (OperationCanceledException) { }
    }
}