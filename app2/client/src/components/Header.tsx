import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logoutAction } from "@/lib/actions";

export default function Header({ authorized }: { authorized: boolean }) {

    const navigate = useNavigate()
    const logout = async () => {
        await logoutAction()
        navigate("/")
    }

    return (
        <nav className="flex py-6 items-center justify-between bg-background border-b border-b-accent-foreground flex-wrap p-6">
            <h1 className="text-3xl font-bold">Realtime Weather Monitoring App</h1>
            {!authorized && <div className="flex gap-2 items-center">
                <Button asChild><Link to="/login">Login</Link></Button>
                <Button variant="ghost" asChild><Link to="/register">Register</Link></Button>
            </div>}

            {authorized && <Button onClick={logout}>Logout</Button>}
        </nav>
    )
}
