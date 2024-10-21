import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { Cloud, Icon } from "lucide-react"
import { getCityWeatherData } from "@/lib/actions"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Dialog } from "./ui/dialog"
import { useState } from "react"

const IMG_URL = "https://openweathermap.org/img/w/"

type Props = {
    city: Cities
}

export default function WeatherCard(props: Props) {

    /*
     * TODO: Fetch the city's weather data
     * TODO: Setup a city specific websocket
     * TODO: add a modal to display visualizations
     *
     * Things to show
     * Average Temperature
     * Maximum
     * Minimum
     * Dominant Weather Condition
     * Wind speed and direction
     * Weather Icon
     *
     * TODO: Cron job to automatically save the daily summaries in a database
     *
     * Modal Things
     * Visualizations
     * Configurable Time Interval
     * Configurable Temp Unit
     * Alerts on the website
     * (OPTIONAL) Subscrible the user for changes in the weather
     * */

    // getCityWeatherData(props.city)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = (value: boolean) => {
        setOpen(value)
        navigate("/")
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>
                            {props.city}
                        </span>
                        <img src={`${IMG_URL}/10d.png`} alt="Cloud" />
                    </CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={() => setOpen(true)} asChild>
                        <Link to={`/${props.city}`}>Show More</Link>
                    </Button>
                </CardFooter>
            </Card>
            <Dialog open={open} onOpenChange={handleOpen}>
                <Outlet />
            </Dialog>
        </>
    )

}
