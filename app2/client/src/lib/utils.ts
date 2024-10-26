import { TemperatureUnit } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const CITIES = ["Delhi", "Mumbai", "Chennai", "Hyderabad", "Bangalore", "Kolkata"] as const

export const convertTemperature = (unit: TemperatureUnit, temp: number) => {
    switch (unit) {
        case "celsius":
            return `${(temp - 273.15).toFixed(2)} °C`
        case "kelvin":
            return `${temp.toFixed(2)} K`
        case "fahrenheit":
            return `${((temp - 273.15 - 32) * (5 / 9)).toFixed(2)} °F`
    }
}
