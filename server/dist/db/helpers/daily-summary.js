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
exports.deleteDailySummary = exports.updateDailySummary = exports.getDailySummaries = exports.createDailySummary = void 0;
const daily_summary_1 = require("../models/daily-summary");
// Create a new daily summary
const createDailySummary = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDailySummary = new daily_summary_1.DailySummaryModel(data);
        yield newDailySummary.save();
        return newDailySummary;
    }
    catch (err) {
        throw new Error('Error creating daily summary: ' + err.message);
    }
});
exports.createDailySummary = createDailySummary;
// Read daily summaries for a specific city
const getDailySummaries = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield daily_summary_1.DailySummaryModel.find({ city }).exec();
    }
    catch (err) {
        throw new Error('Error fetching daily summaries: ' + err.message);
    }
});
exports.getDailySummaries = getDailySummaries;
// Update daily summary by ID
const updateDailySummary = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield daily_summary_1.DailySummaryModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
    }
    catch (err) {
        throw new Error('Error updating daily summary: ' + err.message);
    }
});
exports.updateDailySummary = updateDailySummary;
// Delete daily summary by ID
const deleteDailySummary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield daily_summary_1.DailySummaryModel.findByIdAndDelete(id).exec();
    }
    catch (err) {
        throw new Error('Error deleting daily summary: ' + err.message);
    }
});
exports.deleteDailySummary = deleteDailySummary;
