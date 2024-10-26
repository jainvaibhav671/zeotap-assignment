
import { DailySummaryModel, type DailySummaryType }  from '../models/daily-summary';

// Create a new daily summary
export const createDailySummary = async (data: DailySummaryType) => {
  try {
    const newDailySummary = new DailySummaryModel(data);
    await newDailySummary.save();
    return newDailySummary;
  } catch (err) {
    throw new Error('Error creating daily summary: ' + (err as Error).message);
  }
};

// Read daily summaries for a specific city
export const getDailySummaries = async (city: string) => {
  try {
    return await DailySummaryModel.find({ city }).exec();
  } catch (err) {
    throw new Error('Error fetching daily summaries: ' + (err as Error).message);
  }
};

// Update daily summary by ID
export const updateDailySummary = async (id: string, updatedData: Partial<DailySummaryType>) => {
  try {
    return await DailySummaryModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
  } catch (err) {
    throw new Error('Error updating daily summary: ' + (err as Error).message);
  }
};

// Delete daily summary by ID
export const deleteDailySummary = async (id: string) => {
  try {
    return await DailySummaryModel.findByIdAndDelete(id).exec();
  } catch (err) {
    throw new Error('Error deleting daily summary: ' + (err as Error).message);
  }
};
