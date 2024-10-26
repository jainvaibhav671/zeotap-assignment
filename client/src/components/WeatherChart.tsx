import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"
import { Cities, CityData } from "@/types"
import { convertTemperature } from "@/lib/utils"
import { useSettings } from "@/lib/store"

const chartConfig = {
    temp: {
        label: "Temperature",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

type Props = {
    city: Cities,
    data: CityData
}

export default function WeatherChart(props: Props) {

    const temperatureUnit = useSettings((state) => state.temperatureUnit)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily {props.city} Temperature</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={props.data.data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                const hours = date.getHours()
                                const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
                                return `${hours}:${minutes}`
                            }}
                        />
                        <YAxis
                            dataKey="temp"
                            tickFormatter={(value) => {
                                return convertTemperature(temperatureUnit, value)
                            }}
                            domain={['dataMin', 'auto']} // Ensures no negative values
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={(props) => {
                                if (typeof props.payload === "undefined") return null

                                // @ts-ignore
                                return convertTemperature(temperatureUnit, props.payload[0]?.value || 0)
                            }}
                        />
                        <Line
                            dataKey="temp"
                            type="linear"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
