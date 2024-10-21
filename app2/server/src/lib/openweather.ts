import env from "./env"
import axios from "axios"
import { WeatherResponse } from "../types.d"

const API_KEY = env.OPENWEATHERMAP_API_KEY

// const API_URL = "https://api.openweathermap.org/data/2.5/weather"
// const IMG_URL = "https://openweathermap.org/img/w/"

export const CITY_COORDINATES = {
    "Delhi": { lat: 28.644800, lon: 77.216700 },
    "Mumbai": { lat: 19.072800, lon: 72.882600 },
    "Chennai": { lat: 13.087800, lon: 80.278500 },
    "Hyderabad": { lat: 17.387100, lon: 78.491600 },
    "Bangalore": { lat: 12.971900, lon: 77.593600 },
    "Kolkata": { lat: 22.562600, lon: 88.363000 }
}

export type Cities = keyof typeof CITY_COORDINATES
export type Location = typeof CITY_COORDINATES[Cities]

export async function fetchWeatherData(city: Cities) {
    // const city_location = CITY_COORDINATES[city]

    const url = new URL("https://api.openweathermap.org/data/2.5/weather")
    url.searchParams.set("q", city)
    // url.searchParams.set("lat", city_location.lat.toString())
    // url.searchParams.set("lon", city_location.lon.toString())
    url.searchParams.set("appid", API_KEY)
    const response = await axios.get<WeatherResponse>(url.toString()).then(res => res.data)
    // const icon_url = `${IMG_URL}/${response.weather[0].icon}.png`

    return {
        temp: response.main.temp,
        feels_like: response.main.feels_like,
        dt: response.dt * 1000,
        main: response.weather[0].main,
        description: response.weather[0].description,
        icon: response.weather[0].icon
    }
}


