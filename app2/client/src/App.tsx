import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_API_URL)

function App() {
    const [city, setCity] = useState<Cities | null>(null)
    const [weather_data, setWeatherData] = useState<WeatherData | null>(null)

    useEffect(() => {
        // Connect to the socket
        socket.on("weather-data-update", (data) => {
            console.log(data)
        })

        return () => {
            // Close the socket connection
            socket.off("weather-data-update")
        }
    }, [])

    return (
        <div>
            <h1>Hello World</h1>
            <select value={!city ? "default" : city} onChange={(e) => setCity(e.target.value as Cities)}>
                <option value="default">Select a city</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
            </select>

            <div>
                {city && (
                    <>
                        <p>City: {city}</p>
                    </>
                )}
            </div>

            <div>
                {weather_data && (
                    <>
                        <p>Temperature: {weather_data.temp}</p>
                        <p>Feels like: {weather_data.feels_like}</p>
                        <p>Date: {weather_data.timestamp}</p>
                        <p>Weather: {weather_data.main}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default App
