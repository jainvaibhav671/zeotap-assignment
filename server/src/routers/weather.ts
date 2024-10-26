import { getWeatherData } from "@/db/helpers/weather-data"
import { Router } from "express"

const router = Router()

// Test route
router.get("/", (_req, res) => {
    res.send({
        message: "Hello, Weather!"
    })
})

// router.get("/:city", async (req, res) => {
//     const { city } = req.params
//
//     const startDate = new Date(Date.now())
//     const endDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 1))
//     console.log(city, startDate.toDateString(), endDate.toDateString())
//     const data = await getWeatherData({ city: city, startDate: startDate.toISOString(), endDate: endDate.toISOString() })
//     // console.log(data)
// })
export default router