import { useState, useEffect } from "react";
import { CloudSun } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastCard from "@/components/ForecastCard";
import { searchCity, fetchWeather, CurrentWeather, DailyForecast } from "@/lib/weather";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [daily, setDaily] = useState<DailyForecast[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const cities = await searchCity(query);
      if (cities.length === 0) {
        toast.error("Cidade não encontrada. Tente outro nome.");
        return;
      }
      const city = cities[0];
      const weather = await fetchWeather(city.latitude, city.longitude);
      setCityName(city.name);
      setCountry(city.country);
      setCurrent(weather.current);
      setDaily(weather.daily);
    } catch {
      toast.error("Erro ao buscar dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("Olinda");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <header className="flex items-center gap-3 mb-8 animate-fade-in">
        <CloudSun className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-display font-bold text-gradient-sunset">
          Clima Agora
        </h1>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {current && (
        <div className="mt-8 w-full max-w-md space-y-4">
          <CurrentWeatherCard weather={current} cityName={cityName} country={country} />
          {daily.length > 0 && <ForecastCard forecasts={daily} />}
        </div>
      )}

      {!current && !isLoading && (
        <p className="text-muted-foreground mt-16 animate-pulse-glow">
          Carregando clima de Olinda...
        </p>
      )}
    </div>
  );
};

export default Index;
