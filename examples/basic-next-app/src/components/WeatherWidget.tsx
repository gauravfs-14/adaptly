"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
}

interface WeatherWidgetProps {
  location?: string;
  unit?: "celsius" | "fahrenheit";
}

export function WeatherWidget({
  location = "New York",
  unit = "celsius",
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock weather data for demo purposes
  const mockWeatherData: WeatherData[] = [
    {
      location: "New York",
      temperature: 22,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 12,
      icon: "☀️",
      description: "Clear skies with bright sunshine",
    },
    {
      location: "London",
      temperature: 15,
      condition: "Cloudy",
      humidity: 78,
      windSpeed: 8,
      icon: "☁️",
      description: "Overcast with light clouds",
    },
    {
      location: "Tokyo",
      temperature: 28,
      condition: "Rainy",
      humidity: 85,
      windSpeed: 15,
      icon: "🌧️",
      description: "Heavy rainfall expected",
    },
    {
      location: "Sydney",
      temperature: 25,
      condition: "Partly Cloudy",
      humidity: 70,
      windSpeed: 10,
      icon: "⛅",
      description: "Mix of sun and clouds",
    },
  ];

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockData =
      mockWeatherData.find(
        (data) => data.location.toLowerCase() === location.toLowerCase()
      ) || mockWeatherData[0];

    setWeather(mockData);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const convertTemperature = (temp: number) => {
    if (unit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const getTemperatureUnit = () => {
    return unit === "fahrenheit" ? "°F" : "°C";
  };

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border-0 shadow-lg">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            Failed to load weather
          </p>
          <Button
            onClick={fetchWeather}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
          >
            Try again
          </Button>
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20";
      case "cloudy":
        return "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700";
      case "rainy":
        return "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20";
      case "partly cloudy":
        return "from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20";
      default:
        return "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20";
    }
  };

  return (
    <Card
      className={`h-full w-full bg-gradient-to-br ${getWeatherGradient(
        weather.condition
      )} border-0 shadow-lg flex flex-col`}
    >
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {weather.location}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {weather.condition}
          </p>
        </div>
        <div className="text-4xl animate-bounce">{weather.icon}</div>
      </div>

      <div className="text-center mb-4 flex-shrink-0">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {convertTemperature(weather.temperature)}
          <span className="text-xl text-gray-500 dark:text-gray-400 ml-1">
            {getTemperatureUnit()}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {weather.description}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-4 h-4 text-blue-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Humidity
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {weather.humidity}%
          </p>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <svg
              className="w-4 h-4 text-green-500 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Wind
            </span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {weather.windSpeed} km/h
          </p>
        </div>
      </div>

      <Button
        onClick={fetchWeather}
        variant="outline"
        className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Refresh Weather
      </Button>
    </Card>
  );
}
