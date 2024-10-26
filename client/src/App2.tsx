import { ThemeProvider } from "@/components/theme-provider"
import WeatherCard from "./components/WeatherCard"
import { useEffect } from "react"
import io from "socket.io-client"
import { useData, useSettings } from "./lib/store"
import { CITIES } from "./lib/utils"
import ThemeToggle from "./components/ThemeToggle"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "./components/ui/label"

const socket = io(import.meta.env.VITE_API_URL)

const App = () => {

    const { data, setData } = useData()
    const { temperatureUnit, setTemperatureUnit, } = useSettings()

    useEffect(() => {
        // Connect to the socket
        socket.on("initial-data", (d) => {
            setData(d)
        })

        socket.on("weather-data-update", (d) => {
            // updateData(d)
            console.log(d)
            const old_data = { ...data }
            CITIES.forEach(city => {
                const city_data = d[city]
                if (typeof old_data[city] === "undefined") {
                    old_data[city] = {
                        // @ts-ignore
                        daily: data[city].daily,
                        data: [city_data]
                    }
                } else {
                    old_data[city].data = [...old_data[city].data, city_data]
                }
            })

            setData(old_data)
        })

        return () => {
            // Close the socket connection
            socket.off("initial-data")
        }
    }, [])

    return (
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <div className="w-screen flex flex-col h-screen">
                <nav className="flex flex-col gap-4 items-center sm:flex-row justify-between bg-background border-b border-b-accent-foreground flex-wrap p-4">
                    <h1 className="text-3xl font-bold">Realtime Weather Monitoring App</h1>
                    <ThemeToggle />
                </nav>
                <div className="pt-2 px-8">
                    <Label htmlFor="temperature-unit">Temperature Unit</Label>
                    <Select name="temperature-unit" value={temperatureUnit} onValueChange={setTemperatureUnit}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Temperature Unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="celsius">Celsius (°C)</SelectItem>
                            <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                            <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1">
                    <div className="bg-background text-foreground">
                        <div className="flex flex-col justify-center px-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {CITIES.map(city => {
                                    return <WeatherCard city={city} key={city} data={data[city]} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
