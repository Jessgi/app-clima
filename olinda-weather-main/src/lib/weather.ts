export interface GeoResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  apparentTemperature: number;
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  precipitationProbability: number;
}

export const weatherDescriptions: Record<number, { label: string; icon: string }> = {
  0: { label: "Céu limpo", icon: "☀️" },
  1: { label: "Parcialmente limpo", icon: "🌤️" },
  2: { label: "Parcialmente nublado", icon: "⛅" },
  3: { label: "Nublado", icon: "☁️" },
  45: { label: "Neblina", icon: "🌫️" },
  48: { label: "Neblina gelada", icon: "🌫️" },
  51: { label: "Garoa leve", icon: "🌦️" },
  53: { label: "Garoa moderada", icon: "🌦️" },
  55: { label: "Garoa intensa", icon: "🌧️" },
  61: { label: "Chuva leve", icon: "🌧️" },
  63: { label: "Chuva moderada", icon: "🌧️" },
  65: { label: "Chuva forte", icon: "🌧️" },
  71: { label: "Neve leve", icon: "🌨️" },
  73: { label: "Neve moderada", icon: "🌨️" },
  75: { label: "Neve forte", icon: "❄️" },
  80: { label: "Pancadas leves", icon: "🌦️" },
  81: { label: "Pancadas moderadas", icon: "🌧️" },
  82: { label: "Pancadas fortes", icon: "⛈️" },
  95: { label: "Tempestade", icon: "⛈️" },
  96: { label: "Tempestade com granizo", icon: "⛈️" },
  99: { label: "Tempestade forte", icon: "⛈️" },
};

export function getWeatherInfo(code: number) {
  return weatherDescriptions[code] ?? { label: "Desconhecido", icon: "❓" };
}

export async function searchCity(name: string): Promise<GeoResult[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5&language=pt`
  );
  const data = await res.json();
  return (data.results ?? []).map((r: any) => ({
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export async function fetchWeather(lat: number, lon: number): Promise<{ current: CurrentWeather; daily: DailyForecast[] }> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto`
  );
  const data = await res.json();

  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
    apparentTemperature: data.current.apparent_temperature,
  };

  const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
    date,
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    weatherCode: data.daily.weather_code[i],
    precipitationProbability: data.daily.precipitation_probability_max[i],
  }));

  return { current, daily };
}
