import axios from "axios";
import { ActionFunction, redirect } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

export const loginAction: ActionFunction = async ({ request }) => {
    try {
        const formData = await request.formData()

        const res = await axios.post(`${API_URL}/api/auth/login`, Object.fromEntries(formData.entries()), {
            withCredentials: true
        })
        console.log(res)
        if (res.data.authorized) {
            console.log("redirecting")
            return redirect("/")
        }

        return res

    } catch (error) {
        console.log(error)
        return { error: error }
    }
}

export const registerAction: ActionFunction = async ({ request }) => {

    try {
        const formData = await request.formData()

        const res = await axios.post(`${API_URL}/api/auth/register`, Object.fromEntries(formData.entries()), {
            withCredentials: true
        })
        if (res.data.authorized) return redirect("/")

        return res
    } catch (error) {
        console.log(error)
        return { error: error }
    }
}

export const logoutAction = async () => {
    try {
        await axios.get(`${API_URL}/api/auth/logout`, { withCredentials: true })
    } catch (error: any) {
        console.log(error)
    }
}

export const getCityWeatherData = async (city: Cities) => {
    try {
        const data = await axios.get(`${API_URL}/api/weather/${city}`).then(res => res.data)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
