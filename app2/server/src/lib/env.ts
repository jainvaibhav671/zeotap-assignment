import dotenv from "dotenv"

dotenv.config()

const env = {
    "OPENWEATHERMAP_API_KEY": process.env.OPENWEATHERMAP_API_KEY!,
    "MONGODB_URI": process.env.MONGODB_URI!,
    "CORS_ORIGIN": process.env.CORS_ORIGIN!,
    "PORT": process.env.PORT || 5000
};

// Check if environment variables are defined
for (const [key, value] of Object.entries(env)) {
    if (typeof value === "undefined") {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

export default env
