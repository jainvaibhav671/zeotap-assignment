import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { useState } from "react"
import { Cities, CityData } from "@/types"
import { Skeleton } from "./ui/skeleton"
import { useSettings } from "@/lib/store"
import { convertTemperature } from "@/lib/utils"
import WeatherModal from "./WeatherModal"

const IMG_URL = "https://openweathermap.org/img/w/"

type Props = {
    city: Cities,
    data: CityData | undefined
}

export default function WeatherCard({ data, city }: Props) {

    const temperatureUnit = useSettings((state) => state.temperatureUnit)
    const [open, setOpen] = useState(false)

    return typeof data !== "undefined" ? (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>
                            {city}
                        </span>
                        <div className="flex flex-col items-center">
                            <img src={`${IMG_URL}/${data.daily.dominant_weather_icon}.png`} alt="Cloud" />
                            <span className="text-base font-normal">{data.daily.dominant_weather}</span>
                        </div>
                    </CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 ">
                        <div className="flex flex-col">
                            <h4 className="text-sm font-bold">Average</h4>
                            <p className="text-base">{convertTemperature(temperatureUnit, data.daily.average)}</p>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-sm font-bold">Minimum</h4>
                            <p className="text-base">{convertTemperature(temperatureUnit, data.daily.minimum)}</p>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-sm font-bold">Maximum</h4>
                            <p className="text-base">{convertTemperature(temperatureUnit, data.daily.maximum)}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <WeatherModal open={open} setOpen={setOpen} city={city} data={data} />
                </CardFooter>
            </Card>

        </>
    ) : (
        <Skeleton className="w-full h-full" />
    )

}
