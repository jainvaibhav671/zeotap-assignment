// ── Imports ─────────────────────────────────────────────────────────
import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import env from './lib/env';
import connectDB from "./lib/connectDB";
import routers from "./routers"
import http from "http"
import { Server } from "socket.io"
import cron from 'node-cron';
import { fetchWeatherData, CITY_COORDINATES } from './lib/openweather';
import { createWeatherData, fetchAllWeatherData, getWeatherData } from './db/helpers/weather-data';
import { WeatherDataType } from './db/models/weather-data';
import { DailySummaryModel } from './db/models/daily-summary';
import { Cities, DailyData } from "@/types"
import { Cache } from "./lib/cache"

const app = express();
connectDB()

const cache = new Cache()

// ── Middlewares ─────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// ── Routers ─────────────────────────────────────────────────────────
for (const [path, router] of Object.entries(routers)) {
    app.use(path, router)
}

app.get('/', (_req, res) => { res.send('Hello, TypeScript with Express!'); });

// ── Web Sockets ─────────────────────────────────────────────────────
const server = http.createServer(app); // Necessary for socket.io
const io = new Server(server)

io.on('connection', async (socket) => {
    console.log('Client connected');

    const data = await fetchAllWeatherData()

    // send out the data to the client when it connects
    socket.emit("initial-data", data)

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// ── Cron Jobs ───────────────────────────────────────────────────────
// Schedule a cron job to run every day at 12:00 AM
cron.schedule('*/5 * * * *', async () => {
    // calculate the daily aggregates and rollups
    try {

        const data = await fetchAllWeatherData()
        cache.data = data

        let daily_data: Record<string, DailyData> = {}
        Object.entries(data).forEach(([city, cityData]) => {
            daily_data[city] = cityData.daily
        })
        await DailySummaryModel.create(daily_data)
    } catch (error) {
        console.log(error)
    }
});

// Schedule a cron job to fetch weather data every five minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Fetching weather data...');

    // @ts-ignore
    let data: Record<Cities, WeatherDataType> = {}
    await Promise.all(Object.keys(CITY_COORDINATES).map(async city => {
        console.log(`Fetching weather data for ${city}...`);
        const weather = await fetchWeatherData(city as Cities)
        console.log(`Fetched weather data for ${city}.`);

        data[city as Cities] = weather
    }))

    // TODO store data in database
    console.log("Creating new weather data...");
    const new_data = await createWeatherData(Object.values(data));

    // @ts-ignore
    cache.updateCache(data)

    // Send the fetched weather data to the client
    io.emit("weather-data-update", new_data)
});

server.listen(env.PORT, () => {
    console.log("Started at", new Date().toLocaleString());
    console.log(`Server is running on port ${env.PORT}`);
});
