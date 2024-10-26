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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ── Imports ─────────────────────────────────────────────────────────
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = __importDefault(require("./lib/env"));
const connectDB_1 = __importDefault(require("./lib/connectDB"));
const routers_1 = __importDefault(require("./routers"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const node_cron_1 = __importDefault(require("node-cron"));
const openweather_1 = require("./lib/openweather");
const weather_data_1 = require("./db/helpers/weather-data");
const daily_summary_1 = require("./db/models/daily-summary");
const cache_1 = require("./lib/cache");
const app = (0, express_1.default)();
(0, connectDB_1.default)();
const cache = new cache_1.Cache();
// ── Middlewares ─────────────────────────────────────────────────────
app.use((0, cors_1.default)({ origin: env_1.default.CORS_ORIGIN }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ── Routers ─────────────────────────────────────────────────────────
for (const [path, router] of Object.entries(routers_1.default)) {
    app.use(path, router);
}
app.get('/', (_req, res) => { res.send('Hello, TypeScript with Express!'); });
// ── Web Sockets ─────────────────────────────────────────────────────
const server = http_1.default.createServer(app); // Necessary for socket.io
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Client connected');
    const data = yield (0, weather_data_1.fetchAllWeatherData)();
    // send out the data to the client when it connects
    socket.emit("initial-data", data);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}));
// ── Cron Jobs ───────────────────────────────────────────────────────
// Schedule a cron job to run every day at 12:00 AM
node_cron_1.default.schedule('*/5 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    // calculate the daily aggregates and rollups
    try {
        const data = yield (0, weather_data_1.fetchAllWeatherData)();
        cache.data = data;
        let daily_data = {};
        Object.entries(data).forEach(([city, cityData]) => {
            daily_data[city] = cityData.daily;
        });
        yield daily_summary_1.DailySummaryModel.create(daily_data);
    }
    catch (error) {
        console.log(error);
    }
}));
// Schedule a cron job to fetch weather data every five minutes
node_cron_1.default.schedule('*/5 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Fetching weather data...');
    // @ts-ignore
    let data = {};
    yield Promise.all(Object.keys(openweather_1.CITY_COORDINATES).map((city) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Fetching weather data for ${city}...`);
        const weather = yield (0, openweather_1.fetchWeatherData)(city);
        console.log(`Fetched weather data for ${city}.`);
        data[city] = weather;
    })));
    // TODO store data in database
    console.log("Creating new weather data...");
    const new_data = yield (0, weather_data_1.createWeatherData)(Object.values(data));
    // @ts-ignore
    cache.updateCache(data);
    // Send the fetched weather data to the client
    io.emit("weather-data-update", new_data);
}));
server.listen(env_1.default.PORT, () => {
    console.log("Started at", new Date().toLocaleString());
    console.log(`Server is running on port ${env_1.default.PORT}`);
});
