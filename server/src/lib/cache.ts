import { fetchAllWeatherData } from "../db/helpers/weather-data";
import { CityData, Cities } from "../types";

type CacheType = Record<Cities, CityData>

export class Cache {
    data: CacheType | null = null

    constructor() {
        this.fillCache()
    }

    async fillCache() {
        this.data = await fetchAllWeatherData()
    }

    async updateCache(new_data: Record<Cities, CityData>) {
        const data = this.data
        if (!data) return

        Object.entries(new_data).forEach(([city, cityData]) => {
            // @ts-ignore
            data[city as Cities].data.push(cityData)
        })

        this.data = data
    }
}
