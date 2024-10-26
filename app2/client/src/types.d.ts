import { CITIES } from "./lib/utils"
type Cities = typeof CITIES[number]

type WeatherData = {
    temp: number
    feels_like: number
    timestamp: string
    main: string
    city: string
    description: string
    icon: string
}

type CityData = {
    daily: DailyData;
    data: FetchWeatherData[];
}

type FetchWeatherData = {
    city: "Delhi" | "Mumbai" | "Chennai" | "Hyderabad" | "Bangalore" | "Kolkata";
    timestamp: number;
    temp: number;
    feels_like: number;
    dt: number;
    main: string;
    description: string;
    icon: string;
    wind_speed: number;
    wind_direction: number;
}

type DailyData = {
    average: number;
    minimum: number;
    maximum: number;
    dominant_weather: string;
    dominant_weather_icon: string
}

type TemperatureUnit = "celsius" | "kelvin" | "fahrenheit"

interface Node {
    type: "operator" | "operand";
    operator?: "AND" | "OR"; // Only for operator nodes
    condition?: string; // Only for operand nodes
    left?: Node; // Left child node
    right?: Node; // Right child node
}
