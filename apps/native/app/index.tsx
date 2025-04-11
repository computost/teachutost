import { Api } from "api-client";
import { ReactNode, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WeatherForecast />
    </View>
  );
}

function WeatherForecast(): ReactNode {
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
        response.data.map((obj) => ({
          date: obj.date ? new Date(Date.parse(obj.date)) : undefined,
          summary: obj.summary ?? undefined,
          temperature: obj.temperatureF ?? undefined,
        }))
      );
    })();
  }, []);

  return forecasts;
}

type Forecast = {
  date?: Date;
  summary?: string;
  temperature?: number;
};
