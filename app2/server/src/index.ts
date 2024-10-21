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
import { createWeatherData } from './db/helpers/weather-data';
import { WeatherDataType } from './db/models/weather-data';

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
cron.schedule('0 0 * * *', () => {
    // calculate the daily aggregates and rollups
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

        data[city as Cities] = {
            city: city as Cities,
            timestamp: weather.dt,
            feels_like: weather.feels_like,
            main: weather.main,
            temp: weather.temp
        }
    }))

    // TODO store data in database
    console.log("Creating new weather data...");
    const new_data = await createWeatherData(Object.values(data));
    console.log(new_data)

    // Send the fetched weather data to the client
    io.emit("weather-data-update", new_data)
});

server.listen(env.PORT, () => {
    console.log("Started at", new Date().toLocaleString());
    console.log(`Server is running on port ${env.PORT}`);
});
