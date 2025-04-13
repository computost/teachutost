import { Api } from "api-client";
import { getReceiverRegister } from "api-signalr-client";
import { ReactNode, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { IWeatherForecastClient } from "api-signalr-client/generated/TypedSignalR.Client/MyTurborepo.Apps.Api";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WeatherForecastView />
    </View>
  );
}

function WeatherForecastView(): ReactNode {
  const forecast = useWeatherForecast();

  if (!forecast) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={forecast}
      renderItem={(info) => (
        <View>
          <Text>{info.item.date?.toLocaleDateString()}</Text>
          <Text>{info.item.summary}</Text>
          <Text>{info.item.temperature}</Text>
        </View>
      )}
      keyExtractor={(_, i) => i.toString()}
    />
  );
}

function useWeatherForecast(): Forecast[] | null {
  const [forecasts, setForecasts] = useState<Forecast[] | null>(null);

  useEffect(() => {
    (async () => {
      const api = new Api({
        baseUrl: "http://localhost:8080",
      });
      const response = await api.weatherforecast.getWeatherForecast({
        mode: "cors",
      });
      setForecasts(
        response.data.map((apiForecast) => ({
          date: apiForecast.date
            ? new Date(Date.parse(apiForecast.date))
            : undefined,
          summary: apiForecast.summary ?? undefined,
          temperature: apiForecast.temperatureF ?? undefined,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8080/weatherforecasthub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    const receiver: IWeatherForecastClient = {
      weatherForecastUpdated(forecast) {
        setForecasts((forecasts) => [
          ...(forecasts ?? []),
          {
            date:
              typeof forecast.date === "string"
                ? new Date(forecast.date)
                : forecast.date,
            summary: forecast.summary,
            temperature: forecast.temperatureC,
          },
        ]);

        return Promise.resolve();
      },
    };
    var subscription = getReceiverRegister("IWeatherForecastClient").register(
      connection,
      receiver
    );

    connection.start();

    return () => {
      subscription.dispose();
      connection.stop();
    };
  }, []);

  return forecasts;
}

type Forecast = {
  date?: Date;
  summary?: string;
  temperature?: number;
};
