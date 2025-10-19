import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
} from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  icon: string;
}

interface WeatherWidgetProps {
  weather?: WeatherData;
  title?: string;
  description?: string;
  showDetails?: boolean;
  className?: string;
}

const defaultWeather: WeatherData = {
  location: "San Francisco, CA",
  temperature: 72,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 8,
  visibility: 10,
  pressure: 1013,
  feelsLike: 75,
  icon: "partly-cloudy",
};

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("sun") || conditionLower.includes("clear"))
    return Sun;
  if (conditionLower.includes("cloud")) return Cloud;
  if (conditionLower.includes("rain")) return CloudRain;
  if (conditionLower.includes("snow")) return CloudSnow;
  return Sun;
};

const getWeatherColor = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  }
  if (conditionLower.includes("cloud")) {
    return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
  }
  if (conditionLower.includes("rain")) {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  }
  if (conditionLower.includes("snow")) {
    return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
  }
  return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
};

export function WeatherWidget({
  weather = defaultWeather,
  title = "Weather",
  description = "Current weather conditions",
  showDetails = true,
  className = "",
}: WeatherWidgetProps) {
  const WeatherIcon = getWeatherIcon(weather.condition);

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <WeatherIcon className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Main Weather Display */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getWeatherColor(
              weather.condition
            )} mb-4`}
          >
            <WeatherIcon className="h-8 w-8" />
          </div>
          <div className="text-4xl font-bold text-foreground mb-2">
            {weather.temperature}°F
          </div>
          <div className="text-lg text-muted-foreground mb-1">
            {weather.condition}
          </div>
          <div className="text-sm text-muted-foreground">
            {weather.location}
          </div>
        </div>

        {/* Weather Details */}
        {showDetails && (
          <div className="space-y-3">
            {/* Feels Like */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Feels like</span>
              </div>
              <span className="text-sm font-semibold">
                {weather.feelsLike}°F
              </span>
            </div>

            {/* Weather Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                <Droplets className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                  <div className="text-sm font-semibold">
                    {weather.humidity}%
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                <Wind className="h-4 w-4 text-slate-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Wind</div>
                  <div className="text-sm font-semibold">
                    {weather.windSpeed} mph
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                <Eye className="h-4 w-4 text-slate-600" />
                <div>
                  <div className="text-xs text-muted-foreground">
                    Visibility
                  </div>
                  <div className="text-sm font-semibold">
                    {weather.visibility} mi
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                <Gauge className="h-4 w-4 text-slate-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Pressure</div>
                  <div className="text-sm font-semibold">
                    {weather.pressure} hPa
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weather Status Badge */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-center">
            <Badge
              variant="secondary"
              className={`${getWeatherColor(weather.condition)} text-xs`}
            >
              {weather.condition}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
