import { useSettings } from "@/lib/store"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Cities, CityData } from "@/types"
import { convertTemperature } from "@/lib/utils"
import WeatherChart from "./WeatherChart"

type Props = {
    city: Cities,
    data: CityData,
    open: boolean,
    setOpen: (value: boolean) => void
}
export default function WeatherModal({ city, data, open, setOpen }: Props) {


    const temperatureUnit = useSettings((state) => state.temperatureUnit)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Show More
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>{city}</DialogTitle>
                    <DialogDescription className="flex gap-2 items-center">
                        <span>
                            <img width={25} height={25} src={`https://openweathermap.org/img/w/${data.daily.dominant_weather_icon}.png`} alt="Weather" />
                        </span>
                        <span>
                            {data.daily.dominant_weather}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <h4 className="text-sm font-bold">Minimum</h4>
                        <p className="text-base">{convertTemperature(temperatureUnit, data.daily.minimum)}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-bold">Average</h4>
                        <p className="text-base">{convertTemperature(temperatureUnit, data.daily.average)}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-bold">Maximum</h4>
                        <p className="text-base">{convertTemperature(temperatureUnit, data.daily.maximum)}</p>
                    </div>
                </div>
                <WeatherChart city={city} data={data} />
            </DialogContent >
        </Dialog>
    )
}
