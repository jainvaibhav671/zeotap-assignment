import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const API_URL = import.meta.env.VITE_API_URL

export async function isAuthenticated() {
    const authorized = await axios.get(`${API_URL}/api/auth/authenticated`, {
        withCredentials: true
    }).then(res => res.data.authorized)
    return authorized
}
