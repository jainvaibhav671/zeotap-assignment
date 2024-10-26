import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function Layout() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div>
                <Button asChild>
                    <Link to="/app1">Application 1</Link>
                </Button>
            </div>

            <div>
                <Button asChild>
                    <Link to="/app2">Application 2</Link>
                </Button>
            </div>

        </div>
    )
}
