export interface WeatherResponse {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: System;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeather {
    temp: number;         // Temperature in Kelvin
    feels_like: number;   // Feels like temperature in Kelvin
    temp_min: number;     // Minimum temperature in Kelvin
    temp_max: number;     // Maximum temperature in Kelvin
    pressure: number;     // Atmospheric pressure in hPa
    humidity: number;     // Humidity percentage
    sea_level: number;    // Sea level pressure in hPa
    grnd_level: number;   // Ground level pressure in hPa
}

export interface Wind {
    speed: number;        // Wind speed in meters/sec
    deg: number;          // Wind direction in degrees
    gust?: number;        // Wind gust speed in meters/sec (optional)
}

export interface Rain {
    "1h": number;         // Rain volume for the last hour in mm
}

export interface Clouds {
    all: number;          // Cloudiness percentage
}

export interface System {
    type: number;
    id: number;
    country: string;      // Country code
    sunrise: number;      // Sunrise time in Unix timestamp
    sunset: number;       // Sunset time in Unix timestamp
}
