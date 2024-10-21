import weatherRouter from "./weather"
import authRouter from "./auth"

export default {
    "/api/auth": authRouter,
    "/api/weather": weatherRouter
}
