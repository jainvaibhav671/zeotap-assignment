// ── Imports ─────────────────────────────────────────────────────────
import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import env from './lib/env';
import connectDB from "./lib/connectDB";
import sockets from "./sockets"
import routers from "./routers"
import http from "http"
import { Server } from "socket.io"
import cron from 'node-cron';
import { fetchWeatherData, CITY_COORDINATES, Cities } from './lib/openweather';
import { createWeatherData, getWeatherData } from './db/helpers/weather-data';
import { WeatherDataType } from './db/models/weather-data';
import { DailySummaryModel } from './db/models/daily-summary';

const app = express();
connectDB()

// ── Middlewares ─────────────────────────────────────────────────────
app.use(cors())
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

io.on('connection', (socket) => {
    console.log('Client connected');

    // Add all sockets
    for (const [event, callback] of Object.entries(sockets)) {
        socket.on(event, () => callback(socket));
    }

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// ── Cron Jobs ───────────────────────────────────────────────────────

// Schedule a cron job to run every day at 12:00 AM
cron.schedule('0 0 * * *', async () => {
    // calculate the daily aggregates and rollups
    try {
        const data = await Promise.all(Object.keys(CITY_COORDINATES).map(async (city) => {
            console.log(`Fetching weather data for ${city}...`);
            const cityData = await getWeatherData({
                city: city as Cities,
                startDate: Date.now(),
                endDate: Date.now() + 1 * 24 * 60 * 60 * 1000
            })
            console.log(`Fetched weather data for ${city}.`);

            const average_temp = cityData.reduce((prev, curr) => prev.temp + curr.temp, 0) / cityData.length
            const min_temp = cityData.reduce((prev, curr) => Math.min(prev.temp, curr.temp), { temp: 9999 })
            const max_temp = cityData.reduce((prev, curr) => Math.max(prev.temp, curr.temp), { temp: -9999 })

            // dominant_weather -> mode of values
            let weather_count: Record<string, number> = {}
            let dominant_weather_icon = ""
            let dominant_weather = ""
            cityData.map(val => {
                const main = val.main
                const icon = val.icon
                if (typeof weather_count[main] === "undefined") weather_count[main] = 1
                else weather_count[main] += 1

                if (dominant_weather.length == 0 || weather_count[dominant_weather] < weather_count[main]) {
                    dominant_weather = main;
                    dominant_weather_icon = icon;
                }
            })

            return {
                average: average_temp,
                minimum: min_temp,
                maximum: max_temp,
                dominant_weather: dominant_weather,
                dominant_weather_icon: dominant_weather_icon,
            }
        }))

        await DailySummaryModel.create(data)
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
    console.log()

    // Send the fetched weather data to the client
    io.emit("weather-data-update", new_data)
});

server.listen(env.PORT, () => {
    console.log("Started at", new Date().toLocaleString());
    console.log(`Server is running on port ${env.PORT}`);
});
