"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDataModel = void 0;
const mongoose_1 = require("mongoose");
// Now define the schema using the interface
const weatherDataSchema = new mongoose_1.Schema({
    city: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    timestamp: { type: Date, required: true },
    temp: { type: Number, required: true },
    feels_like: { type: Number, required: true },
    main: { type: String, required: true },
    rawData: { type: Object },
    wind_speed: { type: Number, required: true },
    wind_direction: { type: Number, required: true },
}, {
    collection: "WeatherData"
});
// Export the model, ensuring TypeScript knows its type
exports.WeatherDataModel = (0, mongoose_1.model)('WeatherData', weatherDataSchema);
