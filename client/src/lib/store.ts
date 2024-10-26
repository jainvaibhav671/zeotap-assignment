import { Cities, CityData, TemperatureUnit } from '@/types';
import { create } from 'zustand';

type Data = Record<Cities, CityData>

export type Store = {
    data: Data;
    setData: (data: Data) => void;
    // updateDailyData: (data: CityData["daily"]) => void;
}

export const useData = create<Store>((set, get) => {
    return ({
        data: {} as Data,
        setData: (data) => set({ data }),
        // updateDailyData: (data) => set({ data: { ...get().data, daily: data } })
    });
})

export type Settings = {
    temperatureUnit: TemperatureUnit
    setTemperatureUnit: (unit: TemperatureUnit) => void
}

export const useSettings = create<Settings>((set, get) => {
    return ({
        temperatureUnit: "celsius",
        setTemperatureUnit: (unit) => set({ temperatureUnit: unit })
    })
})
