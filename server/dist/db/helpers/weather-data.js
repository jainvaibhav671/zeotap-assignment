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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllWeatherData = exports.getWeatherData = exports.createWeatherData = void 0;
const weather_data_1 = require("../models/weather-data");
const openweather_1 = require("../../lib/openweather");
// Create a new weather data entry
const createWeatherData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newWeatherData = yield weather_data_1.WeatherDataModel.create(data);
        return newWeatherData;
    }
    catch (err) {
        console.log(err);
        throw new Error('Error creating weather data: ' + err.message);
    }
});
exports.createWeatherData = createWeatherData;
// Read weather data for a specific city and date range
const getWeatherData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, startDate, endDate } = data;
    try {
        return yield weather_data_1.WeatherDataModel.find({
            city,
            timestamp: { $gte: startDate, $lte: endDate }
        });
    }
    catch (err) {
        throw new Error('Error fetching weather data: ' + err.message);
    }
});
exports.getWeatherData = getWeatherData;
const fetchAllWeatherData = () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    let data = {};
    yield Promise.all(Object.keys(openweather_1.CITY_COORDINATES).map((city) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Fetching weather data for ${city}...`);
        const time = new Date(Date.now());
        const today = Date.UTC(time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate());
        const tomorrow = today + 24 * 60 * 60 * 1000;
        const cityData = yield (0, exports.getWeatherData)({
            city: city,
            startDate: today,
            endDate: tomorrow
        });
        console.log(`Fetched weather data for ${city}.`);
        const average_temp = cityData.reduce((prev, curr) => prev + curr.temp, 0) / cityData.length;
        const min_temp = cityData.reduce((prev, curr) => Math.min(prev, curr.temp), 9999);
        const max_temp = cityData.reduce((prev, curr) => Math.max(prev, curr.temp), -9999);
        // dominant_weather -> mode of values
        let weather_count = {};
        let dominant_weather_icon = "";
        let dominant_weather = "";
        cityData.forEach(val => {
            const main = val.main;
            const icon = val.icon;
            weather_count[main] = (weather_count[main] || 0) + 1;
            if (dominant_weather.length == 0 || weather_count[dominant_weather] < weather_count[main]) {
                dominant_weather = main;
                dominant_weather_icon = icon;
            }
        });
        data[city] = {
            daily: {
                average: Number(average_temp.toFixed(2)),
                minimum: Number(min_temp.toFixed(2)),
                maximum: Number(max_temp.toFixed(2)),
                dominant_weather: dominant_weather,
                dominant_weather_icon: dominant_weather_icon,
            },
            // @ts-ignore
            data: cityData
        };
    })));
    return data;
});
exports.fetchAllWeatherData = fetchAllWeatherData;
