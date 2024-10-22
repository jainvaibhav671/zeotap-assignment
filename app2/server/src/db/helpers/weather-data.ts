import { Cities } from '@/lib/openweather';
import { WeatherDataModel, type WeatherDataType } from '../models/weather-data';

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
    console.log(data)

    try {
        return await WeatherDataModel.find({
            city,
            timestamp: { $gte: startDate, $lte: endDate }
        });
    } catch (err: any) {
        throw new Error('Error fetching weather data: ' + err.message);
    }
};

