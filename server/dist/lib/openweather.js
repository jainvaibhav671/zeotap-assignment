"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CITY_COORDINATES = void 0;
exports.fetchWeatherData = fetchWeatherData;
const env_1 = __importDefault(require("./env"));
const axios_1 = __importDefault(require("axios"));
const API_KEY = env_1.default.OPENWEATHERMAP_API_KEY;
// const IMG_URL = "https://openweathermap.org/img/w/"
exports.CITY_COORDINATES = {
    "Delhi": { lat: 28.644800, lon: 77.216700 },
    "Mumbai": { lat: 19.072800, lon: 72.882600 },
    "Chennai": { lat: 13.087800, lon: 80.278500 },
    "Hyderabad": { lat: 17.387100, lon: 78.491600 },
    "Bangalore": { lat: 12.971900, lon: 77.593600 },
    "Kolkata": { lat: 22.562600, lon: 88.363000 }
};
function fetchWeatherData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
        url.searchParams.set("q", city);
        // url.searchParams.set("lat", city_location.lat.toString())
        // url.searchParams.set("lon", city_location.lon.toString())
        url.searchParams.set("appid", API_KEY);
        const response = yield axios_1.default.get(url.toString()).then(res => res.data);
        // const icon_url = `${IMG_URL}/${response.weather[0].icon}.png`
        return {
            city: city,
            timestamp: Date.now(),
            temp: response.main.temp,
            feels_like: response.main.feels_like,
            dt: response.dt * 1000,
            main: response.weather[0].main,
            description: response.weather[0].description,
            icon: response.weather[0].icon,
            wind_speed: response.wind.speed,
            wind_direction: response.wind.deg
        };
    });
}
