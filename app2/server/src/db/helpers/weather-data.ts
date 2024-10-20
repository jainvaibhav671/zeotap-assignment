import { WeatherDataModel, type WeatherDataType } from '../models/weather-data';

// Create a new weather data entry
export const createWeatherData = async (data: WeatherDataType | WeatherDataType[]) => {
    try {
        const newWeatherData = await WeatherDataModel.create(data);
        return newWeatherData;
    } catch (err: any) {
        throw new Error('Error creating weather data: ' + err.message);
    }
};

// Read weather data for a specific city and date range
export const getWeatherData = async (data: {
    city: Pick<WeatherDataType, 'city'>;
    startDate: Pick<WeatherDataType, 'timestamp'>;
    endDate: Pick<WeatherDataType, 'timestamp'>;
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

// Update weather data by ID
export const updateWeatherData = async (data: {
    id: string;
    updatedData: Partial<WeatherDataType>;
}) => {

    const { id, updatedData } = data

    try {
        return await WeatherDataModel.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (err: any) {
        throw new Error('Error updating weather data: ' + err.message);
    }
};

// Delete weather data by ID
export const deleteWeatherData = async (id: string) => {
    try {
        return await WeatherDataModel.findByIdAndDelete(id);
    } catch (err: any) {
        throw new Error('Error deleting weather data: ' + err.message);
    }
};
