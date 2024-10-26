import { Cities, CityData } from '@/types';
import { WeatherDataModel, type WeatherDataType } from '../models/weather-data';
import { CITY_COORDINATES } from '@/lib/openweather';

// Create a new weather data entry
export const createWeatherData = async (data: WeatherDataType | WeatherDataType[]) => {
    try {
        const newWeatherData = await WeatherDataModel.create(data);
        return newWeatherData;
    } catch (err: any) {
        console.log(err)
        throw new Error('Error creating weather data: ' + err.message);
    }
};

// Read weather data for a specific city and date range
export const getWeatherData = async (data: {
    city: Cities
    startDate: Pick<WeatherDataType, 'timestamp'>["timestamp"];
    endDate: Pick<WeatherDataType, 'timestamp'>["timestamp"];
}) => {

    const { city, startDate, endDate } = data

    try {
        return await WeatherDataModel.find({
            city,
            timestamp: { $gte: startDate, $lte: endDate }
        });
    } catch (err: any) {
        throw new Error('Error fetching weather data: ' + err.message);
    }
};


export const fetchAllWeatherData = async () => {
    // @ts-ignore
    let data: Record<Cities, CityData> = {};
    await Promise.all(Object.keys(CITY_COORDINATES).map(async (city) => {
        console.log(`Fetching weather data for ${city}...`);
        const time = new Date(Date.now())

        const today = Date.UTC(time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate())
        const tomorrow = today + 24 * 60 * 60 * 1000
        const cityData = await getWeatherData({
            city: city as Cities,
            startDate: today,
            endDate: tomorrow
        })
        console.log(`Fetched weather data for ${city}.`);

        const average_temp = cityData.reduce((prev, curr) => prev + curr.temp, 0) / cityData.length
        const min_temp = cityData.reduce((prev, curr) => Math.min(prev, curr.temp), 9999)
        const max_temp = cityData.reduce((prev, curr) => Math.max(prev, curr.temp), -9999)

        // dominant_weather -> mode of values
        let weather_count: Record<string, number> = {}
        let dominant_weather_icon = ""
        let dominant_weather = ""
        cityData.forEach(val => {
            const main = val.main
            const icon = val.icon
            weather_count[main] = (weather_count[main] || 0) + 1

            if (dominant_weather.length == 0 || weather_count[dominant_weather] < weather_count[main]) {
                dominant_weather = main;
                dominant_weather_icon = icon;
            }
        })

        data[city as Cities] = {
            daily: {
                average: Number(average_temp.toFixed(2)),
                minimum: Number(min_temp.toFixed(2)),
                maximum: Number(max_temp.toFixed(2)),
                dominant_weather: dominant_weather,
                dominant_weather_icon: dominant_weather_icon,
            },
            // @ts-ignore
            data: cityData
        }
    }))

    return data
}
