"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weather_1 = __importDefault(require("./weather"));
exports.default = {
    "/api/weather": weather_1.default
};
