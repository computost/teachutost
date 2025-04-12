using Microsoft.AspNetCore.SignalR;
using TypedSignalR.Client;

namespace MyTurborepo.Apps.Api;

public class WeatherForecastHub : Hub<IWeatherForecastClient>, IWeatherForecastHub { }

[Hub]
public interface IWeatherForecastHub
{

}

[Receiver]
public interface IWeatherForecastClient
{
    Task WeatherForecastUpdated(WeatherForecast forecast);
}