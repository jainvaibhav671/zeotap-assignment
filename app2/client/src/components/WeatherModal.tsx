import { LoaderFunction } from "react-router-dom"
import { DialogContent, DialogHeader } from "./ui/dialog"

export const loader: LoaderFunction = async ({ params }) => {
    console.log(params)
    return null
}

export default function WeatherModal() {
    return (
        <DialogContent>
            <DialogHeader>City</DialogHeader>
            <h1>City</h1>
        </DialogContent>
    )
}
