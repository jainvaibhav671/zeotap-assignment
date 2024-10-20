import { Schema, model } from 'mongoose';

const dailySummarySchema = new Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  avgTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  totalUpdates: { type: Number, required: true }
});

export const DailySummaryModel = model('DailySummary', dailySummarySchema);
export type DailySummaryType = typeof DailySummaryModel.schema.obj; // Extract the raw object from schema
