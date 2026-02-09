import { CurrentWeather, getWeatherInfo } from "@/lib/weather";
import { Droplets, Wind, Thermometer } from "lucide-react";

interface Props {
  weather: CurrentWeather;
  cityName: string;
  country: string;
}

const CurrentWeatherCard = ({ weather, cityName, country }: Props) => {
  const info = getWeatherInfo(weather.weatherCode);

  return (
    <div className="glass-card rounded-2xl p-8 text-center animate-fade-in">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-1">
        {cityName}, {country}
      </p>

      <div className="text-7xl my-4">{info.icon}</div>

      <h2 className="text-6xl font-display font-bold text-gradient-sunset leading-none">
        {Math.round(weather.temperature)}°
      </h2>

      <p className="text-foreground/80 text-lg mt-2 font-medium">{info.label}</p>

      <p className="text-muted-foreground text-sm mt-1">
        Sensação térmica: {Math.round(weather.apparentTemperature)}°C
      </p>

      <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-secondary" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-4 h-4 text-secondary" />
          <span>{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-4 h-4 text-primary" />
          <span>{Math.round(weather.apparentTemperature)}°</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
