import { DailySummaryModel } from "@/db/models/daily-summary";
import { Cities } from "./openweather"
import { type FetchWeatherData } from "./openweather"

type CityData = {
    daily: {
        average: number;
        minimum: number;
        maximum: number;
        dominant_weather: number;
        dominant_weather_icon: string
    };
    data: FetchWeatherData[];
}
type Cache = Record<Cities, CityData>

export let cache = {} as Cache

export function isCacheEmpty() {
    return Object.keys(cache).length === 0
}

export function fillCache() {
    // function to initialize the cache
    // if the database has data
}
