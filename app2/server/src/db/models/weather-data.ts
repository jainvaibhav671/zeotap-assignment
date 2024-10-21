import { Schema, model } from 'mongoose';

// Now define the schema using the interface
const weatherDataSchema = new Schema({
    city: { type: String, required: true },
    timestamp: { type: Date, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    main: { type: String, required: true },
    rawData: { type: Object }
}, {
    collection: "WeatherData"
});

// Export the model, ensuring TypeScript knows its type
export const WeatherDataModel = model('WeatherData', weatherDataSchema);
export type WeatherDataType = typeof WeatherDataModel.schema.obj; // Extract the raw object from schema
