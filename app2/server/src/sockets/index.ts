import { DefaultEventsMap, type Socket } from "socket.io"
import { getWeatherData } from "../db/helpers/weather-data"

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export default {
    "requestWeatherData": async (socket: SocketType) => {
        // const weatherData = await getWeatherData({
        //
        // });  // Get latest data from DB
        socket.emit('weatherData', {});
    }
}
