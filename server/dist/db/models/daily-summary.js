"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailySummaryModel = void 0;
const mongoose_1 = require("mongoose");
const dailySummarySchema = new mongoose_1.Schema({
    city: { type: String, required: true },
    date: { type: Date, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    dominantCondition: { type: String, required: true },
    dominantConditionIcon: { type: String, required: true },
    totalUpdates: { type: Number, required: true }
}, {
    collection: "DailySummary"
});
exports.DailySummaryModel = (0, mongoose_1.model)('DailySummary', dailySummarySchema);
