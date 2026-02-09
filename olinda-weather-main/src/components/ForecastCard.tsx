import { DailyForecast, getWeatherInfo } from "@/lib/weather";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  forecasts: DailyForecast[];
}

const ForecastCard = ({ forecasts }: Props) => {
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
      <h3 className="font-display font-semibold text-foreground/90 mb-4 text-sm tracking-wide uppercase">
        Próximos 7 dias
      </h3>
      <div className="space-y-3">
        {forecasts.map((day, i) => {
          const info = getWeatherInfo(day.weatherCode);
          const date = parseISO(day.date);
          const dayName = i === 0 ? "Hoje" : format(date, "EEE", { locale: ptBR });

          return (
            <div
              key={day.date}
              className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
            >
              <span className="text-foreground/70 text-sm font-medium capitalize w-16">
                {dayName}
              </span>
              <span className="text-2xl">{info.icon}</span>
              <span className="text-xs text-secondary">
                {day.precipitationProbability}% 💧
              </span>
              <div className="flex gap-2 text-sm">
                <span className="text-foreground font-semibold">
                  {Math.round(day.tempMax)}°
                </span>
                <span className="text-muted-foreground">
                  {Math.round(day.tempMin)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
