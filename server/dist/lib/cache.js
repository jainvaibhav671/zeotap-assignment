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
exports.Cache = void 0;
const weather_data_1 = require("../db/helpers/weather-data");
class Cache {
    constructor() {
        this.data = null;
        this.fillCache();
    }
    fillCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield (0, weather_data_1.fetchAllWeatherData)();
        });
    }
    updateCache(new_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.data;
            if (!data)
                return;
            Object.entries(new_data).forEach(([city, cityData]) => {
                // @ts-ignore
                data[city].data.push(cityData);
            });
            this.data = data;
        });
    }
}
exports.Cache = Cache;
