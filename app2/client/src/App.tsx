import { useState } from "react"
import io from "socket.io-client"
import { DatePicker } from "./components/ui/date-picker"
import WeatherCard from "./components/WeatherCard"
import { Outlet } from "react-router-dom"
import { Dialog } from "./components/ui/dialog"

// const socket = io(import.meta.env.VITE_API_URL)


function App() {
    const [selected, setSelected] = useState<Date[] | undefined>(undefined)
    // useEffect(() => {
    //     // Connect to the socket
    //     socket.on("weather-data-update", (data) => {
    //         console.log(data)
    //     })
    //
    //     return () => {
    //         // Close the socket connection
    //         socket.off("weather-data-update")
    //     }
    // }, [])

    return (
        <>
            <div className="w-screen h-screen bg-background text-foreground">
                <div className="flex flex-col justify-center p-8">
                    <DatePicker selected={selected} setSelected={setSelected} />

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <WeatherCard city="Delhi" />
                        <WeatherCard city="Mumbai" />
                        <WeatherCard city="Kolkata" />
                        <WeatherCard city="Hyderabad" />
                        <WeatherCard city="Chennai" />
                        <WeatherCard city="Bangalore" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
